/**
 * Determines if a question is active by checking that its AskIf conditions are met
 */
import { IAskIf, IQuestionInstance } from '../../../models/question'
import { IBusinessType as BusinessType } from '../../../models/businessType'
import { AskIfOperator } from '../../../models/enums'

export function isQuestionActive(
  questionInstances: IQuestionInstance[],
  conditions?: IAskIf[],
  businessTypes?: BusinessType[],
  values?: any
): boolean {
  if (!conditions || conditions.length === 0) {
    return true
  }

  for (let askIf of conditions) {
    const questionInstance = questionInstances.find((x) => x.id === askIf.questionInstanceId)

    if (!questionInstance) {
      return false
    }

    let answer: string[] | undefined

    if (values && values[questionInstance.id]) {
      answer = [values[questionInstance.id]]
    } else {
      answer = questionInstance?.answer
    }

    if (!answer || answer.length === 0) {
      return false
    }

    if (questionInstance?.question.id === 'Q000340') {
      // @ts-ignore
      const businessType = businessTypes?.find((x) => x.id === answer[0])
      if (businessType) {
        answer = [businessType?.id, businessType?.name, businessType?.internalCode]
      }
    }

    switch (askIf.operator) {
      case AskIfOperator.EQUAL:
        if (!answer.includes(askIf.value)) {
          return false
        }
        continue
      case AskIfOperator.NOT_EQUAL:
        if (answer.includes(askIf.value)) {
          return false
        }
        continue
      case AskIfOperator.IN:
        const values = askIf.value.split(',')
        if (!answer.find((x) => values.includes(x))) {
          return false
        }
        continue
    }
  }

  return true
}
