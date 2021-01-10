import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import DynamicFormV2 from '../components/dynamicFormV2/dynamicForm'
import {Heading, Preloader} from '../components/chromaComponents'
import { IUpdateAnswer, IUpdateAnswers } from '../models/answer'
import { IApplicationState } from '../store'
import * as IApplicationConfigurationStore from '../store/application-config.store'
import * as IInsuranceApplicationStore from '../store/insurance-application.store'
import * as IBusinessTypeStore from '../store/business-type.store'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { IApplicationConfig } from '../models/application-config'
import { IBusinessType } from '../models/businessType'
import { IInsuranceApplication } from '../models/insurance-application'
import { IQuestionInstance } from '../models/question'
import { mapAnsweredQuestions } from '../helpers/question.helper'


const stageOfProcess: string = 'NEEDS_ANALYSIS';
// At runtime, Redux will merge together...
interface NeedsAnalysisProps extends RouteComponentProps<any> {
  getApplicationConfig: (callback: () => void) => Promise<IApplicationConfig>
  createInsuranceApplication: () => Promise<IInsuranceApplication>
  updateAnswersOnInsuranceApplication: (
    updatedAnswers: IUpdateAnswers,
    callback: () => void
  ) => Promise<IInsuranceApplication>
  getBusinessTypes: () => Promise<IBusinessType[]>
  insuranceApplication: IInsuranceApplication
  answeredQuestions: IUpdateAnswer[]
  businessType: IBusinessType[]
}

class NeedsAnalysis extends React.PureComponent<NeedsAnalysisProps> {
  constructor(props: Readonly<NeedsAnalysisProps>) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  public componentDidMount() {
    this.ensureDataFetched()
    
  }

  private ensureDataFetched() {
    this.props.getApplicationConfig(() => {
      this.props.getBusinessTypes()
      this.props.createInsuranceApplication()
    })
  }
  
  private mapQuestionAnswersFromState(questions:IQuestionInstance[]):IQuestionInstance[]{
    return mapAnsweredQuestions(questions, this.props.answeredQuestions);
  }

  private onSubmit(values: any) {
    const convertedValues = {
      answers: Object.keys(values).map((key) => ({
        questionInstanceId: key,
        questionId: key,
        answer: [values[key]],
      })),
      stageOfProcess: stageOfProcess,
    }

    this.props.updateAnswersOnInsuranceApplication(convertedValues, () => {
      this.props.history.push('/products')
    })
  }

  private getStageQuestions():IQuestionInstance[] {
    let needAnalysisQuestions: IQuestionInstance[] = []
    let insuranceApplicationQuestions = this.props.insuranceApplication?.questionInstances?.filter(
      (x) => x.question.stageOfProcess === stageOfProcess
    )

    if (insuranceApplicationQuestions) {
      let businessTypesQuestion = insuranceApplicationQuestions.find((x) => x.question.id === 'Q000340')

      if (businessTypesQuestion && businessTypesQuestion.question.answerType) {
        businessTypesQuestion.question.answerType.enumValues = this.props.businessType?.map((b) => {
          return {
            value: b.id,
            description: b.name,
          }
        })
        needAnalysisQuestions.push(businessTypesQuestion)
      }

      const filteredQuestions = insuranceApplicationQuestions.filter((x) => x.question.id !== 'Q000340')

      if (filteredQuestions) {
        filteredQuestions.forEach((q) => needAnalysisQuestions.push(q))
      }
    }
    const mappedQuestions = this.mapQuestionAnswersFromState(needAnalysisQuestions)
    return mappedQuestions;
  }

  public render() {
    const { businessType } = this.props
    const needsAnalysisQuestions = this.getStageQuestions()
    
    if (needsAnalysisQuestions.length === 0) {
      return <Preloader brand={'ami'} />
    }

    return (
      <React.Fragment>
        <div>
          <Heading size={3}>To get started, tell us about your business</Heading>
          <DynamicFormV2
            questionInstances={needsAnalysisQuestions}
            businessTypes={businessType}
            onSubmit={this.onSubmit}
          />
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    insuranceApplication: store.insuranceApplication?.insuranceApplication,
    answeredQuestions: store.insuranceApplication?.answeredQuestions?.find(x=> x.stageOfProcess === stageOfProcess)?.answers,
    businessType: store.businessType?.businessTypes,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getApplicationConfig: (callback: () => void) =>
      dispatch(IApplicationConfigurationStore.actionCreators.getApplicationConfig(callback)),
    createInsuranceApplication: () => dispatch(IInsuranceApplicationStore.actionCreators.createInsuranceApplication()),
    updateAnswersOnInsuranceApplication: (updatedAnswers: IUpdateAnswers, callback: () => void) =>
      dispatch(IInsuranceApplicationStore.actionCreators.updateAnswers(updatedAnswers, callback)),
    getBusinessTypes: () => dispatch(IBusinessTypeStore.actionCreators.getBusinessTypes()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NeedsAnalysis as any))
