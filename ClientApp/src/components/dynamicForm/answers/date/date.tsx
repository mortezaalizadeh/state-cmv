import React from 'react'
import {Column, FormGroup, Label, List, ListItem, Row, Text} from '../../../chromaComponents'
import dayjs from 'dayjs'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import * as dh from '../../helpers/dateHelpers'
import { IQuestionInstance, QuestionConfig } from '../../../../models/question'
import { AnswerUpdatedEvent } from '../../../../models/answer'
import { ISO_DATE_FORMAT } from '../../../../config/globals'
import { AnswerDataType } from '../../../../models/enums'
import { DatePickerWrapper } from './date-picker-wrapper'

const DateAnswer = (
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
  const answer = question.answer && question.answer.length > 0 ? question.answer[0] : ''

  // Check that the answer is a valid date before displaying it
  const answerDate = dayjs(answer, ISO_DATE_FORMAT)
  const selectedDate = answerDate.isValid() ? answerDate.toDate() : undefined

  const maxValue = dh.convertToDate(question.question.answerType?.maxValue)
  const minValue = dh.convertToDate(question.question.answerType?.minValue)

  function handleOnChange(dateInput: Date) {
    const answer = dateInput ? dayjs(dateInput).format(ISO_DATE_FORMAT) : ''

    if (props.questionInstance.answer?.includes(answer)) {
      return
    }

    const event = {
      questionId: question.question.id,
      questionInstanceId: question.id,
      questionText: question.question.text,
      type: AnswerDataType.DATE,
      answer: [answer],
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
          {/* Using react-datepicker instead of Chroma's date picker as it allows the user to select the year
             and provides min/max date options*/}
          <FormGroup error={question.error}>
            <DatePicker
              selected={selectedDate}
              dateFormat="dd/MM/yyyy"
              minDate={minValue?.toDate()}
              maxDate={maxValue?.toDate()}
              isClearable
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              onChange={handleOnChange}
              // Wraps the DatePicker inside a Chroma Input component to keep the form look consistent
              customInput={<DatePickerWrapper error={question.error} />}
            />
          </FormGroup>
        </Column>
      </Row>
    </div>
  )
}

export default React.forwardRef(DateAnswer)
