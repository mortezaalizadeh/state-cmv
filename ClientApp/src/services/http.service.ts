import axios, { AxiosResponse, Method } from 'axios'

export class HttpService{
  async  get(url: string, headers: any) {
    return await this.sendRequest(url, 'GET', headers, null)
  }

  async post(url: string, headers: any, body: any) {
    return await this.sendRequest(url, 'POST', headers, body)
  }

  async put(url: string, headers: any, body: any){
    return await this.sendRequest(url, 'PUT', headers, body)
  }

  async patch(url: string, headers: any, body: any) {
    return await this.sendRequest(url, 'PATCH', headers, body)
  }

  async sendRequest(url: string, method: Method, headers: any, body: any){

    const requestOptions = {
      url: url,
      method: method,
      headers: headers,
      data: body? JSON.stringify(body): null
    }
    const response = await axios(requestOptions)

    return response
  }
}