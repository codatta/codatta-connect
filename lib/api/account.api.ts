import { AxiosInstance } from 'axios'
import request from './request'
import { TonProofItemReply } from '@tonconnect/sdk'

type TAccountType = 'email' | 'block_chain'
export type TAccountRole = 'B' | 'C'
export type TDeviceType = 'WEB' | 'TG' | 'PLUG'

export interface ILoginResponse {
  token: string
  old_token?: string
  user_id: string,
  new_user: boolean
}

interface ILoginParamsBase {
  account_type: string
  connector: 'codatta_email' | 'codatta_wallet' | 'codatta_ton'
  account_enum: TAccountRole,
  inviter_code: string
  source: {
    device: TDeviceType,
    channel: string,
    app: string,
    [key:string]: any
  },
  related_info?: {
    [key:string]: any
  }
}

interface IConnectParamsBase {
  account_type: string
  connector: 'codatta_email' | 'codatta_wallet' | 'codatta_ton'
  account_enum: TAccountRole,
}

interface IEmailLoginParams extends ILoginParamsBase {
  connector: 'codatta_email'
  account_type: 'email'
  email:string,
  email_code: string
}

interface IEmailConnectParams extends IConnectParamsBase {
  connector: 'codatta_email'
  account_type: 'email'
  email:string,
  email_code: string
}

interface IWalletLoginParams extends ILoginParamsBase {
  connector: 'codatta_wallet'
  account_type: 'block_chain'
  address: string
  wallet_name: string
  chain: string
  nonce: string
  signature: string
  message: string
}

interface IWalletConnectParams extends IConnectParamsBase {
  connector: 'codatta_wallet'
  account_type: 'block_chain'
  address: string
  wallet_name: string
  chain: string
  nonce: string
  signature: string
  message: string
}

interface ITonLoginParams extends ILoginParamsBase {
  connector: 'codatta_ton'
  account_type: 'block_chain'
  wallet_name: string,
  address: string,
  chain: string,
  connect_info: [{[key:string]:string}, TonProofItemReply]
}

interface ITonConnectParams extends IConnectParamsBase {
  connector: 'codatta_ton'
  account_type: 'block_chain'
  wallet_name: string,
  address: string,
  chain: string,
  connect_info: [{[key:string]:string}, TonProofItemReply]
}

class AccountApi {

  private _apiBase = ''

  constructor(private request: AxiosInstance) { }

  public setApiBase(base?: string) {
    this._apiBase = base || ''
  }

  public async getNonce(props: { account_type: TAccountType}) {
    const { data } = await this.request.post<{ data: string }>(`${this._apiBase}/api/v2/user/nonce`, props)
    return data.data
  }

  public async getEmailCode(props: { account_type: TAccountType , email: string}, captcha:string) {
    const { data } = await this.request.post<{ data: string }>(`${this._apiBase}/api/v2/user/get_code`, props, {
      headers: {'Captcha-Param': captcha}
    })
    return data.data
  }

  public async emailLogin(props: IEmailLoginParams) {
    const res = await this.request.post<{ data: ILoginResponse }>(`${this._apiBase}/api/v2/user/login`, props)
    return res.data
  }

  public async walletLogin(props: IWalletLoginParams) {
    if (props.account_enum === 'C') {
      const res = await this.request.post<{ data: ILoginResponse }>(`${this._apiBase}/api/v2/user/login`, props)
      return res.data
    } else {
      const res = await this.request.post<{ data: ILoginResponse }>(`${this._apiBase}/api/v2/business/login`, props)
      return res.data
    }
  }

  public async tonLogin(props: ITonLoginParams) {
    const res = await this.request.post<{ data: ILoginResponse }>(`${this._apiBase}/api/v2/user/login`, props)
    return res.data
  }

  public async bindEmail(props: IEmailConnectParams)  {
    const res = await this.request.post('/api/v2/user/account/bind', props)
    return res.data
  }

  public async bindTonWallet(props: ITonConnectParams)  {
    const res = await this.request.post('/api/v2/user/account/bind', props)
    return res.data
  }

  public async bindEvmWallet(props: IWalletConnectParams)  {
    const res = await this.request.post('/api/v2/user/account/bind', props)
    return res.data
  }
}

export default new AccountApi(request)
