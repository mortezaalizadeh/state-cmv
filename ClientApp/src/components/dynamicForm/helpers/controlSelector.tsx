import { IQuestionInstance } from '../../../models/question'
import { AnswerUpdatedEvent } from '../../../models/answer'
import { IBusinessType as BusinessType } from '../../../models/businessType'
import React, { RefObject } from 'react'
import GroupAnswer from '../answers/group/group'
import { AnswerDataType, QuestionType } from '../../../models/enums'
import { isQuestionActive } from './isQuestionActive'
import Segmented from '../answers/Segmented/segmented'
import DateAnswer from '../answers/date/date'
import BooleanAnswer from '../answers/boolean/boolean'
import EnumAnswer from '../answers/enum/enum'
import NumberAnswer from '../answers/number/number'
import StringAnswer from '../answers/string/string'
import { QuestionConfigs } from '../../../config/question-content-config'

const brand = "ami";
export const renderControl = (
  questionInstance: IQuestionInstance,
  onAnswerChange: (event: AnswerUpdatedEvent) => void,
  allQuestionInstances: IQuestionInstance[],
  businessTypes?: BusinessType[],
  ref?: RefObject<any>
) => {
  if(questionInstance.question.questionType === "HIDDEN"){
    return null
  }

  if (questionInstance.question.questionType === QuestionType.GROUP) {
    return (
      <GroupAnswer
        questionInstance={questionInstance}
        hideQuestion={!isQuestionActive(allQuestionInstances, questionInstance.askIf)}
      />
    )
  }

  if(questionInstance.question.answerType?.enumValues?.find(x=> x.value === 'true')){
    return <Segmented
      questionInstance={questionInstance}
      onAnswerChange={onAnswerChange}
      ref={ref}
      questionConfig={QuestionConfigs.find(q=> q.brand === brand)?.config.find(x=> x.id === questionInstance.question.id)}
      hideQuestion={!isQuestionActive(allQuestionInstances, questionInstance.askIf, businessTypes)}/>
  }

  switch (questionInstance.question.answerType?.dataType) {
    case AnswerDataType.STRING:
      return (
        <StringAnswer
          questionInstance={questionInstance}
          hideQuestion={!isQuestionActive(allQuestionInstances, questionInstance.askIf, businessTypes)}
          onAnswerChange={onAnswerChange}
          ref={ref}
          questionConfig={QuestionConfigs.find(q=> q.brand === brand)?.config.find(x=> x.id === questionInstance.question.id)}
        />
      )
    case AnswerDataType.INT:
      return (
        <NumberAnswer
          questionInstance={questionInstance}
          hideQuestion={!isQuestionActive(allQuestionInstances, questionInstance.askIf, businessTypes)}
          onAnswerChange={onAnswerChange}
          questionConfig={QuestionConfigs.find(q=> q.brand === brand)?.config.find(x=> x.id === questionInstance.question.id)}
          ref={ref}
        />
      )
    case AnswerDataType.BOOLEAN:
      return (
        <BooleanAnswer
          questionInstance={questionInstance}
          hideQuestion={!isQuestionActive(allQuestionInstances, questionInstance.askIf, businessTypes)}
          onAnswerChange={onAnswerChange}
          ref={ref}
          questionConfig={QuestionConfigs.find(q=> q.brand === brand)?.config.find(x=> x.id === questionInstance.question.id)}
        />
      )
    case AnswerDataType.ENUM:
      return (
        <EnumAnswer
          questionInstance={questionInstance}
          hideQuestion={!isQuestionActive(allQuestionInstances, questionInstance.askIf, businessTypes)}
          onAnswerChange={onAnswerChange}
          ref={ref}
          questionConfig={QuestionConfigs.find(q=> q.brand === brand)?.config.find(x=> x.id === questionInstance.question.id)}
        />
      )
    case AnswerDataType.DATE:
      return (
        <DateAnswer
          questionInstance={questionInstance}
          hideQuestion={!isQuestionActive(allQuestionInstances, questionInstance.askIf, businessTypes)}
          onAnswerChange={onAnswerChange}
          ref={ref}
          questionConfig={QuestionConfigs.find(q=> q.brand === brand)?.config.find(x=> x.id === questionInstance.question.id)}
        />
      )
    default:
      return null
  }
}