import React from 'react'
import { Column, List, ListItem, Row, Text } from '../../../chromaComponents'
import { Field } from 'react-final-form'
import { IQuestionInstance, QuestionConfig } from '../../../../models/question'
import { RenderSelect } from '../../../../components/reactFinalFormChromaComponents'
import { AnswerDataType } from '../../../../models/enums'

const EnumAnswer = ({
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

  const enumValues =
    question.question.answerType?.enumValues?.map((x) => {
      return {
        label: x.description,
        value: x.value,
      }
    }) ?? []

  const defaultSelectOption = [{ label: 'Select an answer', value: '' }]
  const options = !question.question.answerType?.multiSelect ? defaultSelectOption.concat(enumValues) : enumValues

  const validate = (value: string | undefined): string | undefined => {
    const validationRules = question.question.answerType

    if (!validationRules) {
      return undefined
    }

    const answer = value ? value : ''

    if (validationRules.dataType !== AnswerDataType.ENUM) {
      return `Only enum answer type is supported`
    }

    if (!answer || answer.length === 0) {
      return validationRules.isRequired ? 'Answer is required' : undefined
    }

    if (validationRules.enumValues && !validationRules.enumValues?.find((r) => r.value === answer)) {
      return 'Answer must be one of the provided options'
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
          component={RenderSelect}
          size={3}
          initialValue={question.answer ? question.answer[0] : ''}
          values={options}
          validate={validate}
        />
      </Column>
    </Row>
  )
}

export default EnumAnswer
