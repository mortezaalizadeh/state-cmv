import { BaseService } from './base.service'
import { IBusinessTypeApi, IIAWrite } from '../models/application-config'
import { HttpService } from './http.service'
import { IBusinessType } from '../models/businessType'

export class BusinessTypesService extends BaseService{
  constructor(private businessTypesApiConfig:IBusinessTypeApi, private httpService: HttpService) {
    super();
  }
  
  async getBusinessTypes(token?: string){
    const url = super.getApimUrl(this.businessTypesApiConfig.apiHost, this.businessTypesApiConfig.businessTypePath, this.businessTypesApiConfig.apiVersion);

    return this.httpService.get(url, super.getHeadersWithoutSession(token));
  }
}