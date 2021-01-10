import React from 'react'
import { Column, List, ListItem, Row, Text } from '../../../chromaComponents'
import { Field } from 'react-final-form'
import { IQuestionInstance, QuestionConfig } from '../../../../models/question'
import { RenderInputFormat } from '../../../../components/reactFinalFormChromaComponents'
import { convertToNumber } from '../../../dynamicForm/helpers/convertToNumber'
import { AnswerDataType } from '../../../../models/enums'
import * as dh from '../../../dynamicForm/helpers/dateHelpers'

const NumberAnswer = ({
  question,
  hideQuestion,
  questionConfig,
}: {
  question: IQuestionInstance
  hideQuestion?: boolean
  questionConfig?: QuestionConfig
}) => {
  if (hideQuestion) {
    return null
  }

  const validate = (value: string | undefined): string | undefined => {
    const validationRules = question.question.answerType

    if (!validationRules) {
      return undefined
    }

    let answer: any

    if (value && value.length > 0) {
      answer = convertToNumber(value)
    } else {
      answer = undefined
    }

    if (validationRules.dataType !== AnswerDataType.INT) {
      return `Only integer answer type is supported`
    }

    if (answer === undefined) {
      return validationRules.isRequired ? 'Answer is required' : undefined
    }

    if (isNaN(answer)) {
      return `Answer is not a valid number`
    }

    // Max/MinValue can be a number or a rule to calculate the value at runtime
    if (validationRules.maxValue) {
      const maxValue =
        convertToNumber(validationRules.maxValue) ?? dh.getDateSectionFromDateRule(validationRules.maxValue)

      if (maxValue && answer > maxValue) {
        return `Answer must be less than ${maxValue + 1}`
      }
    }

    if (validationRules.minValue) {
      const minValue =
        convertToNumber(validationRules.minValue) ?? dh.getDateSectionFromDateRule(validationRules.minValue)

      if (minValue && answer < minValue) {
        return `Answer must be greater than ${minValue - 1}`
      }
    }

    return undefined
  }

  return (
    <Row>
      <Column xs={8}>
        <Text fontSize={18} weight={600}>
          {question.question.answerType?.isRequired ? `${question.question.text} *` : question.question.text}
        </Text>
        {questionConfig?.subTexts && (
          <List bullet>
            {questionConfig?.subTexts.map((text) => {
              return (
                <ListItem>
                  <Text fontSize={12} color="grey">
                    {text}
                  </Text>
                </ListItem>
              )
            })}
          </List>
        )}
        {questionConfig?.subText && (
          <Text fontSize={14} color="grey">
            {questionConfig?.subText}
          </Text>
        )}
      </Column>
      <Column xs={4}>
        <Field<string>
          name={question.id}
          component={RenderInputFormat}
          placeholder={question.question.answerType?.placeholder}
          size={3}
          decimalScale={0}
          initialValue={question.answer ? question.answer[0] : undefined}
          thousandSeparator={false}
          validate={validate}
        />
      </Column>
    </Row>
  )
}

export default NumberAnswer
