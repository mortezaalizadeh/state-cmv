import { IApiUrl } from '../models/application-config'
import { GenerateUUID } from '../helpers/common'

export class BaseService{
  getApimUrl(apiHost:string, path: string, apiVersion:string):string {
    return `${apiHost}${path}?api-version=${apiVersion}`;
  }

  getHeaders(
    sessionId: string,
    token?: string,
    correlationId: string = GenerateUUID(),
    idempotencyId: string = GenerateUUID(),
  ) {
    let headers = this.getHeadersWithoutSession(token, correlationId, idempotencyId)
    return {
      ...headers,
      'X-Session-ID': sessionId,
    };
  }

  getHeadersWithoutSession(
    token?: string,
    correlationId: string = GenerateUUID(),
    idempotencyId: string = GenerateUUID(),
  ) {
    if (!token) {
      throw new Error('Authorization Token required.')
    }
    
    return {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      Pragma: 'no-cache',
      'X-Correlation-ID': correlationId,
      'X-Idempotency-ID': idempotencyId,
      'Authorization': `Bearer ${token}`
    };
  }
};