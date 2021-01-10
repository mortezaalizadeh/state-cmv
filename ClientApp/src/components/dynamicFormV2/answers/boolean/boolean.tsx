import React from 'react'
import { Column, List, ListItem, Row, Text } from '../../../chromaComponents'
import { Field } from 'react-final-form'
import { IQuestionInstance, QuestionConfig } from '../../../../models/question'
import { RenderSegmentedControl } from '../../../../components/reactFinalFormChromaComponents'

const BooleanAnswer = ({
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

  const value = question.answer && question.answer.length > 0 ? question.answer[0] : ''
  const values = [
    {
      label: 'Yes',
      value: 'true',
    },
    {
      label: 'No',
      value: 'false',
    },
  ]

  const validate = (value: string | undefined): string | undefined => {
    const validationRules = question.question.answerType

    if (!validationRules) {
      return undefined
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
          component={RenderSegmentedControl}
          initialValue={value}
          values={values}
          validate={validate}
        />
      </Column>
    </Row>
  )
}

export default BooleanAnswer
