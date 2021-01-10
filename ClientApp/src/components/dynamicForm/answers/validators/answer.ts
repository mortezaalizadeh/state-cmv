import * as dh from '../../helpers/dateHelpers'
import dayjs from 'dayjs'
import { IAnswerType, IQuestionInstance } from '../../../../models/question'
import { ValidationResult } from '../../../../models/answer'
import { AnswerDataType } from '../../../../models/enums'
import { ISO_DATE_FORMAT } from '../../../../config/globals'
import { convertToNumber } from '../../helpers/convertToNumber'

export function validateQuestionInstance(questionInstance: IQuestionInstance) {
  const answerType = questionInstance.question.answerType
  if (!answerType) {
    return
  }

  let answer: any
  switch (answerType.dataType) {
    case AnswerDataType.STRING:
      answer = questionInstance.answer && questionInstance.answer.length > 0 ? questionInstance.answer[0] : ''
      return validateStringAnswer(answer, answerType)

    case AnswerDataType.INT:
      if (questionInstance.answer && questionInstance.answer.length > 0) {
        answer = convertToNumber(questionInstance.answer[0])
      } else {
        answer = undefined
      }
      return validateNumberAnswer(answer, answerType)

    case AnswerDataType.BOOLEAN:
      answer = questionInstance.answer && questionInstance.answer.length > 0 ? questionInstance.answer[0] : undefined
      return validateBooleanAnswer(answer, answerType)

    case AnswerDataType.ENUM:
      answer = questionInstance.answer && questionInstance.answer.length > 0 ? questionInstance.answer : ['']
      return validateEnumAnswer(answer, answerType)

    case AnswerDataType.DATE:
      answer = questionInstance.answer && questionInstance.answer.length > 0 ? questionInstance.answer[0] : ''
      return validateDateAnswer(answer, answerType)
  }
}

export function validateStringAnswer(answer: string, validationRules: IAnswerType): ValidationResult {
  if (validationRules.dataType !== AnswerDataType.STRING) {
    return {
      isValid: false,
      error: `Only string answer type is supported`,
    }
  }

  if (!answer.trim()) {
    return validationRules.isRequired
      ? {
          isValid: false,
          error: 'Answer is required',
        }
      : {
          isValid: true,
          error: '',
        }
  }

  if (validationRules.maxLength && answer.length > validationRules.maxLength) {
    return {
      isValid: false,
      error: 'Answer is too long',
    }
  }

  if (validationRules.minLength && answer.length < validationRules.minLength) {
    return {
      isValid: false,
      error: 'Answer is too short',
    }
  }

  if (validationRules.regex) {
    const result = answer.match(validationRules.regex)
    if (result && result.length === 0) {
      return {
        isValid: false,
        error: 'Answer contains invalid characters',
      }
    }
  }

  return {
    isValid: true,
    error: '',
  }
}

export function validateNumberAnswer(answer: number | undefined, validationRules: IAnswerType): ValidationResult {
  if (validationRules.dataType !== AnswerDataType.INT) {
    return {
      isValid: false,
      error: `Only integer answer type is supported`,
    }
  }

  if (answer === undefined) {
    return validationRules.isRequired
      ? {
          isValid: false,
          error: 'Answer is required',
        }
      : {
          isValid: true,
          error: '',
        }
  }

  if (isNaN(answer)) {
    return {
      isValid: false,
      error: `Answer is not a valid number`,
    }
  }

  // Max/MinValue can be a number or a rule to calculate the value at runtime
  if (validationRules.maxValue) {
    const maxValue =
      convertToNumber(validationRules.maxValue) ?? dh.getDateSectionFromDateRule(validationRules.maxValue)

    if (maxValue && answer > maxValue) {
      return {
        isValid: false,
        error: `Answer must be less than ${maxValue + 1}`,
      }
    }
  }

  if (validationRules.minValue) {
    const minValue =
      convertToNumber(validationRules.minValue) ?? dh.getDateSectionFromDateRule(validationRules.minValue)

    if (minValue && answer < minValue) {
      return {
        isValid: false,
        error: `Answer must be greater than ${minValue - 1}`,
      }
    }
  }

  return {
    isValid: true,
    error: '',
  }
}

export function validateBooleanAnswer(answer: boolean | undefined, validationRules: IAnswerType) {
  if (validationRules.dataType !== AnswerDataType.BOOLEAN) {
    return {
      isValid: false,
      error: `Only boolean answer type is supported`,
    }
  }

  if (answer === undefined) {
    return validationRules.isRequired
      ? {
          isValid: false,
          error: 'Answer is required',
        }
      : {
          isValid: true,
          error: '',
        }
  }
}

export function validateEnumAnswer(answers: string[], validationRules: IAnswerType) {
  if (validationRules.dataType !== AnswerDataType.ENUM) {
    return {
      isValid: false,
      error: `Only enum answer type is supported`,
    }
  }

  // Check that answer is not empty or contains only empty strings
  if (!answers || answers.length === 0 || answers.join('') === '') {
    return validationRules.isRequired
      ? {
          isValid: false,
          error: 'Answer is required',
        }
      : {
          isValid: true,
          error: '',
        }
  }

  if (validationRules.enumValues && !answers.every((x) => validationRules.enumValues?.find((r) => r.value === x))) {
    return {
      isValid: false,
      error: 'Answer must be one of the provided options',
    }
  }

  return {
    isValid: true,
    error: '',
  }
}

export function validateDateAnswer(answer: string, validationRules: IAnswerType) {
  if (validationRules.dataType !== AnswerDataType.DATE) {
    return {
      isValid: false,
      error: `Only date answer type is supported`,
    }
  }

  if (!answer) {
    return validationRules.isRequired
      ? {
          isValid: false,
          error: 'Answer is required',
        }
      : {
          isValid: true,
          error: '',
        }
  }

  // DayJs needs to be told what format to read a date in
  // If the provided date doesn't match the format the dayJs value will be 'Invalid Date'
  const answerDate = dayjs(answer, ISO_DATE_FORMAT)

  // answerDate is invalid if the answer value doesn't match the format
  // e.g. 2020-MM-DD, 2020/03/12, 2020-15-02 are all invalid if the provided format was 'YYYY-MM-DD'
  if (!answerDate.isValid()) {
    return {
      isValid: false,
      error: `Answer must be a valid date`,
    }
  }

  // max/minValue can be either a date (YYYY-MM-DD) or a rule to calculate the date at runtime
  const maxValue = dh.convertToDate(validationRules.maxValue)
  if (maxValue && answerDate.isAfter(maxValue.format(ISO_DATE_FORMAT))) {
    return {
      isValid: false,
      error: `Date cannot be later than ${maxValue.format('DD/MM/YYYY')}`,
    }
  }

  const minValue = dh.convertToDate(validationRules.minValue)
  if (minValue && answerDate.isBefore(minValue.format(ISO_DATE_FORMAT))) {
    return {
      isValid: false,
      error: `Date cannot be earlier than ${minValue.format('DD/MM/YYYY')}`,
    }
  }

  return {
    isValid: true,
    error: '',
  }
}
