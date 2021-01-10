export interface AnswerUpdatedEvent {
  questionId: string
  questionInstanceId: string
  type: string
  questionText: string
  answer: any[]
}
export interface IUpdateAnswer{
  questionId: string
  questionInstanceId: string
  answer: any[]
}
export interface ValidationResult {
  isValid: boolean
  error: string
}
export interface IUpdateAnswers {
  answers:IUpdateAnswer[],
  stageOfProcess:string
}
