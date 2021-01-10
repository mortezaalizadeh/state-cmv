/*
*************************************************************************************************************************
Any enums used by Dynamic Form and its child components must be declared here to keep it detached from Quote Management
*************************************************************************************************************************
*/

export enum QuestionType {
  GROUP = 'GROUP',
  QUESTION = 'QUESTION',
}

export enum StageOfProcess {
  PRODUCT_QUESTIONS = 'PRODUCT_QUESTIONS',
  POLICY_QUESTIONS = 'POLICY_QUESTIONS'
}

export enum AnswerDataType {
  STRING = 'string',
  INT = 'int',
  ENUM = 'enum',
  BOOLEAN = 'boolean',
  DATE = 'date',
}

export enum AskIfOperator {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  IN = 'IN',
}
