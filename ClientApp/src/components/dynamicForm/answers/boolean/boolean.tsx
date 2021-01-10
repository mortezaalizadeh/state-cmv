import React from 'react'
import {
  ButtonGroup,
  Column,
  FormGroup,
  List, ListItem,
  Row,
  SegmentedControl,
  Text
} from '../../../chromaComponents'
import { AnswerDataType } from '../../../../models/enums'
import { IQuestionInstance, QuestionConfig } from '../../../../models/question'
import { AnswerUpdatedEvent } from '../../../../models/answer'

const BooleanAnswer = (
  props: {
    questionInstance: IQuestionInstance
    hideQuestion?: boolean
    questionConfig?: QuestionConfig
    onAnswerChange: (event: AnswerUpdatedEvent) => void
  },
  ref: any
) => {
  if (props.hideQuestion) {
    return null
  }
  const questionConfig = props.questionConfig
  const question = props.questionInstance

  const value = question.answer && question.answer.length > 0 ? question.answer[0] : ''
  const btnName = `btn-${question.id}`
  const values =
    [
      {
        label: 'Yes',
        value: 'true',
      },
      {
        label: 'No',
        value: 'false',
      }
    ]

  // Change the button border to red if there's an error
  const elements = document.getElementsByName(btnName)
  question.error
    ? elements.forEach((x) => (x.style.borderColor = '#da0000'))
    : elements.forEach((x) => x.removeAttribute('style'))

  function handleOnClick(changeEvent: any, selectedValue: string) {
    if (value === selectedValue) {
      return
    }

    const event = {
      questionId: question.question.id,
      questionInstanceId: question.id,
      questionText: question.question.text,
      type: AnswerDataType.BOOLEAN,
      answer: [selectedValue],
    } as AnswerUpdatedEvent

    props.onAnswerChange(event)
  }

  return (
    <div ref={ref}>
      <Row>
        <Column xs={8}>
          <Text  fontSize={18} weight={600}>
            {question.question.answerType?.isRequired ? `${question.question.text} *` : question.question.text}
          </Text>
          {questionConfig?.subTexts && (
            <List bullet>
              {questionConfig?.subTexts.map((text) => {
                return (
                  <ListItem>
                    <Text fontSize={12} color="grey">{text}</Text>
                  </ListItem>
                )
              })}
            </List>
          )}
          {questionConfig?.subText && <Text fontSize={14} color="grey">{questionConfig?.subText}</Text>}
        </Column>
        <Column xs={4}>
          <FormGroup error={question.error}>
            <ButtonGroup>
              <SegmentedControl onChange={handleOnClick}
                                name={btnName}
                                values={values}
                                value={value}
              />


            </ButtonGroup>
          </FormGroup>
        </Column>
      </Row>
    </div>
  )
}

export default React.forwardRef(BooleanAnswer)
