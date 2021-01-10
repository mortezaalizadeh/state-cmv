import React, { Fragment } from 'react'
import { Form } from 'react-final-form'
import { Button } from '../../components/chromaComponents'
import { IQuestionInstance } from '../../models/question'
import { IBusinessType } from '../../models/businessType'
import { AnswerDataType } from '../../models/enums'
import NumberAnswer from './answers/number/number'
import EnumAnswer from './answers/enum/enum'
import BooleanAnswer from './answers/boolean/boolean'
import { isQuestionActive } from '../dynamicForm/helpers/isQuestionActive'
import { QuestionConfigs } from '../../config/question-content-config'

const brand = 'ami'

const DynamicForm = React.memo(
  ({
    questionInstances,
    businessTypes,
    onSubmit,
  }: {
    questionInstances?: IQuestionInstance[]
    businessTypes?: IBusinessType[]
    onSubmit: (values: any) => void
  }) => (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, invalid, values, submitSucceeded }) => (
        <form onSubmit={handleSubmit}>
          {questionInstances &&
            questionInstances.map((questionInstance) => (
              <Fragment key={questionInstance.id}>
                {questionInstance.question.answerType?.dataType === AnswerDataType.ENUM &&
                  !questionInstance.question.answerType?.enumValues?.find((x) => x.value === 'true') && (
                    <EnumAnswer
                      question={questionInstance}
                      hideQuestion={!isQuestionActive(questionInstances, questionInstance.askIf, businessTypes, values)}
                      questionConfig={QuestionConfigs.find((q) => q.brand === brand)?.config.find(
                        (x) => x.id === questionInstance.question.id
                      )} />
                  )}
                {(questionInstance.question.answerType?.enumValues?.find((x) => x.value === 'true') ||
                  questionInstance.question.answerType?.dataType === AnswerDataType.BOOLEAN) && (
                    <BooleanAnswer
                      question={questionInstance}
                      hideQuestion={!isQuestionActive(questionInstances, questionInstance.askIf, businessTypes, values)}
                      questionConfig={QuestionConfigs.find((q) => q.brand === brand)?.config.find(
                        (x) => x.id === questionInstance.question.id
                      )} />
                  )}
                {questionInstance.question.answerType?.dataType === AnswerDataType.INT && (
                  <NumberAnswer
                    question={questionInstance}
                    hideQuestion={!isQuestionActive(questionInstances, questionInstance.askIf, businessTypes, values)}
                    questionConfig={QuestionConfigs.find((q) => q.brand === brand)?.config.find(
                      (x) => x.id === questionInstance.question.id
                    )} />
                )}
              </Fragment>
            ))}
          {/*Loading animation option 1:*/}
          <Button type="submit" disabled={submitting || invalid} primary loading={submitSucceeded}>
            Go to Prod Recommendation
          </Button>
          {/*Loading animation option 2:*/}
          {/*<Button type="submit" disabled={submitting || invalid} primary>*/}
          {/*    Go to Prod Recommendation*/}
          {/*</Button>*/}
          {/*{submitSucceeded && <Loader />}*/}
        </form>
      )}
    />
  )
)

export default DynamicForm
