import React, { useEffect, useState } from 'react'
import {Column, FormGroup, Input, Label, List, ListItem, Row, Text} from '../../../chromaComponents'
import { AnswerDataType } from '../../../../models/enums'
import { AnswerUpdatedEvent } from '../../../../models/answer'
import { IQuestionInstance, QuestionConfig } from '../../../../models/question'

const StringAnswer = (
  props: {
    questionInstance: IQuestionInstance
    hideQuestion?: boolean
    questionConfig?: QuestionConfig
    onAnswerChange: (event: AnswerUpdatedEvent) => void
  },
  ref: any
) => {
  // TODO - default values
  const [value, setValue] = useState('')

  // StringAnswer's input value needs to be stored in a local state to trigger a render whenever a character is entered
  // This effect allows the Dyanmic Form to override the current value state, for example resetting the form
  useEffect(() => {
    const parentAnswer = props.questionInstance.answer
    parentAnswer && parentAnswer.length > 0 ? setValue(parentAnswer[0]) : setValue('')
  }, [props.questionInstance.answer])
  const questionConfig = props.questionConfig

  if (props.hideQuestion) {
    return null
  }

  const question = props.questionInstance

  // Send an AnswerUpdateEvent to Dynamic Form to validate and persist the answer
  function handleOnBlur() {
    // No need to emit event if the answer hasn't changed
    if (props.questionInstance.answer?.includes(value)) {
      return
    }

    const event = {
      questionId: question.question.id,
      questionInstanceId: question.id,
      questionText: question.question.text,
      type: AnswerDataType.STRING,
      answer: [value.trim()], // The trimmed input will be rendered in StringAnswer via useEffect()
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
            <Input
              size={3}
              placeholder={question.question.answerType?.placeholder}
              value={value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
              onBlur={handleOnBlur}
            />
          </FormGroup>
        </Column>
      </Row>
    </div>
  )
}

export default React.forwardRef(StringAnswer)
