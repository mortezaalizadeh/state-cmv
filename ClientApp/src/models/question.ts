import { RefObject } from 'react'
import { AskIfOperator, StageOfProcess } from './enums'

export interface IQuestionInstance {
  id: string
  parentId?: string
  path: string
  productInstanceIds: string[]
  question: IQuestion
  questionInstances: IQuestionInstance[]
  askIf?: IAskIf[]
  answer?: string[]
  error?: string
}

export interface IQuestion {
  id: string
  text: string
  questionType: string
  stageOfProcess: string
  answerType?: IAnswerType
  intent?: string
  maxOccurs?: number
  order?: number
}

export interface IAnswerType {
  dataType: string
  defaultValue?: any
  format?: string
  maxValue?: any
  minValue?: any
  maxLength?: number
  minLength?: number
  multiSelect?: boolean
  placeholder?: string
  enumValues?: Array<IEnumValue>
  isRequired?: boolean
  regex?: string
}

export interface IAskIf {
  questionInstanceId: string
  path: string
  operator: AskIfOperator
  value: string
  stageOfProcess: StageOfProcess
}

export interface IEnumValue {
  value: string;
  description: string
}

export interface IQuestionInstanceRef {
  id: string
  ref: RefObject<any>
}

export interface IQuestionContentConfig {
  brand:string,
  config: QuestionConfig[]
}

export interface QuestionConfig{
  id: string
  subTexts?: string[]
  subText?: string
  helpText?: string
}
