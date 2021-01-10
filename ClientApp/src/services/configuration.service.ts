import { BaseService } from './base.service'
import { HttpService } from './http.service'

export  class ConfigurationService extends BaseService{
  constructor(private httpService: HttpService) {
    super();
  }
  
  async  getConfiguration(){
    return this.httpService.get(`api/configuration`, { Accept: 'application/json' });
  }
  async  getToken(){
    return this.httpService.get(`api/identity`, { Accept: 'application/json' });
  }
}