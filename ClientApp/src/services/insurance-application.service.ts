import { BaseService } from './base.service'
import { IIAWrite } from '../models/application-config'
import { HttpService } from './http.service'
import { GenerateUUID } from '../helpers/common'
import { IUpdateAnswers } from '../models/answer'
import { IRemoveProductInstance } from '../models/product'

export class InsuranceApplicationService extends BaseService {
  constructor(private iaWriteConfiguration: IIAWrite, private httpService: HttpService) {
    super()
  }

  async createInsuranceApplication(token?: string) {
    const url = super.getApimUrl(this.iaWriteConfiguration.apiHost, this.iaWriteConfiguration.createInsuranceApplicationPath, this.iaWriteConfiguration.apiVersion)
    return this.httpService.post(url, super.getHeaders(GenerateUUID(), token), {
      applicationType: 'quoteNewBusiness',
      offeringId: '51c56add-2a7a-49ee-9a6b-ac76a49ddd40'
    })
  }

  async updateAnswers(requestBody: IUpdateAnswers, etag: string, id: string, token?: string) {
    const url = super.getApimUrl(this.iaWriteConfiguration.apiHost, this.iaWriteConfiguration.updateAnswersPath, this.iaWriteConfiguration.apiVersion).replace('(insuranceApplicationId)', id)
    const headers = {
      ...super.getHeaders(GenerateUUID(), token),
      'If-Match': etag,
    }
    return this.httpService.patch(url, headers, requestBody)
    }

    async removeProductInstance(requestBody: IRemoveProductInstance, etag: string, id: string, token?: string) {
        const url = super.getApimUrl(this.iaWriteConfiguration.apiHost, this.iaWriteConfiguration.removeProductInstancePath, this.iaWriteConfiguration.apiVersion).replace('(insuranceApplicationId)', id)
        const headers = {
            ...super.getHeaders(GenerateUUID(), token),
            'If-Match': etag,
        }
        return this.httpService.patch(url, headers, requestBody)
    }
}