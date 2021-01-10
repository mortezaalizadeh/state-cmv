import React from 'react'
import {Column, FormGroup, InputFormat, Label, List, ListItem, Row, Text} from '../../../chromaComponents'
import { IQuestionInstance, QuestionConfig } from '../../../../models/question'
import { AnswerUpdatedEvent } from '../../../../models/answer'
import { AnswerDataType } from '../../../../models/enums'
import { convertToNumber } from '../../helpers/convertToNumber'

const NumberAnswer = (
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

  let answer: number | undefined
  if (question.answer && question.answer.length > 0) {
    answer = convertToNumber(question.answer[0])
  }

  // Send an AnswerUpdateEvent to Dynamic Form to validate and persist the answer
  function handleOnBlur(userInput: string) {
    if (props.questionInstance.answer?.includes(userInput)) {
      return
    }

    const event = {
      questionId: question.question.id,
      questionInstanceId: question.id,
      questionText: question.question.text,
      type: AnswerDataType.INT,
      answer: userInput === '' ? undefined : [userInput], // Empty inputs should be undefined answers for numeric instead of empty string
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
            <InputFormat
              size={3}
              decimalScale={0}
              thousandSeparator={false}
              placeholder={question.question.answerType?.placeholder}
              value={answer}
              onBlur={(event: React.ChangeEvent<HTMLInputElement>) => handleOnBlur(event.target.value)}
            />
          </FormGroup>
        </Column>
      </Row>
    </div>
  )
}

export default React.forwardRef(NumberAnswer)
