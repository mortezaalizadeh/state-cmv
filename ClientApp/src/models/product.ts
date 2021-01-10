
export interface IProductInstance {
  id: string
  status: string
  product: IProduct
  questionSetVersion?: number
  effectiveDate?: string
}
export interface IProduct {
  id: string
  priority: number
  name: string
  maxInstances: number
}

export interface ProductConfig {
  id: string
  title?:string
  description?:string
  iconLink?: string
  category?: string
  moreInfoLinkText?: string
  moreInfoLink?: string
  infoText?: string
  referredMessages?: ReferredMessages[]
  quoteReferredMessage?: string
  removalConfirmationMessage?: string
  offered: boolean
  optionalProductsMessage: string
  analyticsCategory?: string
  analyticsLogAsMainProduct: boolean
  analyticsAddNaturalDisaster: boolean
  descriptor?:string
}

interface ReferredMessages {
  code?: string
  message?:string
}

export interface IProductContentConfig {
  brand:string,
  config: ProductConfig[]
}

export interface IRemoveProductInstance {
    productInstanceIds: string[]
}