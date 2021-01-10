import React from 'react'
import {
  ButtonGroup,
  Column,
  FormGroup,
  List,
  ListItem,
  Row,
  SegmentedControl,
  Text,
} from '../../../chromaComponents'
import { IQuestionInstance, QuestionConfig } from '../../../../models/question'
import { AnswerUpdatedEvent } from '../../../../models/answer'
import { AnswerDataType } from '../../../../models/enums'

const SegmentedAnswer = (
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
  const enumValues =
    question.question.answerType?.enumValues?.map((x) => {
      return {
        label: x.description,
        value: x.value,
      }
    }) ?? []

  function emitAnswerChange(answer: string[]) {
    const event = {
      questionId: question.question.id,
      questionInstanceId: question.id,
      questionText: question.question.text,
      type: AnswerDataType.ENUM,
      answer: answer,
    } as AnswerUpdatedEvent

    props.onAnswerChange(event)
  }

  function handleSelectOnChange(changeEvent: any, selectedValue: string) {
    if (props.questionInstance.answer?.includes(selectedValue)) {
      return
    }

    emitAnswerChange([selectedValue])
  }

  return (
    <div ref={ref} id={question.id}>
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
        <Column  xs={4}>
          <FormGroup error={question.error}>
            <ButtonGroup>
              <SegmentedControl onChange={handleSelectOnChange} name={btnName} values={enumValues} value={value} />
            </ButtonGroup>
          </FormGroup>
        </Column>
      </Row>
    </div>
  )
}

export default React.forwardRef(SegmentedAnswer)
