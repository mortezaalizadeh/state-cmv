import { IProductInstance } from './product'
import { IQuestionInstance } from './question'

export interface IInsuranceApplication {
  id: string
  sessionId: string
  applicationType: string
  offeringId: string
  brand: string
  productInstances?: IProductInstance[]
  questionInstances?: IQuestionInstance[]
}
