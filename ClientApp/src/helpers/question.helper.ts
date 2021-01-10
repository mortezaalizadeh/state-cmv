import { IQuestionInstance } from '../models/question'
import { IUpdateAnswer } from '../models/answer'

export function mapAnsweredQuestions(questions:IQuestionInstance[], answeredQuestions:IUpdateAnswer[]):IQuestionInstance[]{
  if(answeredQuestions){
    questions.forEach(x=> {
      const questionAnswered = answeredQuestions.find(q=> q.questionInstanceId === x.id);
      if(questionAnswered){
        x.answer = questionAnswered.answer;
      }
    })
  }
  return questions;
}