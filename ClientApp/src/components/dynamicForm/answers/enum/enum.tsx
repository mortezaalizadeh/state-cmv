import React from 'react'
import {Checkbox, Column, FormGroup, Label, List, ListItem, Row, Select, Text} from '../../../chromaComponents'
import { AnswerDataType } from '../../../../models/enums'
import { AnswerUpdatedEvent } from '../../../../models/answer'
import { IQuestionInstance, QuestionConfig } from '../../../../models/question'

const EnumAnswer = (
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
  const selectedValue = question.answer && question.answer.length > 0 ? question.answer : ['']
  const defaultSelectOption = [{ label: 'Select an answer', value: '' }]

  const enumValues =
    question.question.answerType?.enumValues?.map((x) => {
      return {
        label: x.description,
        value: x.value,
      }
    }) ?? []

  const options = !question.question.answerType?.multiSelect ? defaultSelectOption.concat(enumValues) : enumValues

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

  function handleCheckboxOnChange(changeEvent: any, selectedValues: string[]) {
    // Remove the empty string element Chroma adds to the beginning of the array
    const filteredValues = selectedValues.filter((x) => x !== '')
    const answersSame = question.answer?.sort().join() === selectedValues.sort().join()
    if (answersSame) {
      return
    }

    emitAnswerChange(filteredValues)
  }

  function handleSelectOnChange(changeEvent: any, selectedValue: string) {
    if (props.questionInstance.answer?.includes(selectedValue)) {
      return
    }

    emitAnswerChange([selectedValue])
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
          {question.question.answerType?.multiSelect ? (
            <FormGroup error={question.error}>
              <Checkbox value={selectedValue} values={options} onChange={handleCheckboxOnChange} />
            </FormGroup>
          ) : (
            <FormGroup error={question.error}>
              <Select size={3} value={selectedValue[0]} values={options} onChange={handleSelectOnChange} />
            </FormGroup>
          )}
        </Column>
      </Row>
    </div>
  )
}

export default React.forwardRef(EnumAnswer)
