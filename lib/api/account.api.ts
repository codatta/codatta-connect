import { AxiosInstance } from 'axios'
import request from './request'

class AccountApi {

  constructor(private request: AxiosInstance) { }

  public async getNonce(): Promise<string> {
    const { data } = await this.request.get<{ data: string }>('/wallet/sign/nonce')
    return data.data
  }
}

export default new AccountApi(request)
