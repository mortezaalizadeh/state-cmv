import React from 'react'
import { IQuestionInstance } from '../../../../models/question'

const GroupAnswer = React.memo((props: { questionInstance: IQuestionInstance; hideQuestion?: boolean }) =>
  props.questionInstance && !props.hideQuestion ? (
    <h4>
      <u>{props.questionInstance.question.text}</u>
    </h4>
  ) : null
)

export default GroupAnswer
