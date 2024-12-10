import { AxiosInstance } from 'axios';
type TAccountType = 'email' | 'block_chain';
export type TAccountRole = 'B' | 'C';
export type TDeviceType = 'WEB' | 'TG' | 'PLUG';
export interface ILoginResponse {
    token: string;
    old_token: string;
    user_id: string;
    new_user: boolean;
}
interface ILoginParamsBase {
    account_type: string;
    connector: 'codatta_email' | 'codatta_wallet' | 'codatta_ton';
    account_enum: TAccountRole;
    inviter_code: string;
    source: {
        device: TDeviceType;
        channel: string;
        app: string;
        [key: string]: any;
    };
    related_info?: {
        [key: string]: any;
    };
}
interface IEmailLoginParams extends ILoginParamsBase {
    connector: 'codatta_email';
    account_type: 'email';
    email: string;
    email_code: string;
}
interface IWalletLoginParams extends ILoginParamsBase {
    connector: 'codatta_wallet';
    account_type: 'block_chain';
    address: string;
    wallet_name: string;
    chain: string;
    nonce: string;
    signature: string;
    message: string;
}
interface ITonLoginParams extends ILoginParamsBase {
    connector: 'codatta_ton';
    account_type: 'block_chain';
    wallet_name: string;
    address: string;
    chain: string;
    connect_info: object[];
}
declare class AccountApi {
    private request;
    private _apiBase;
    constructor(request: AxiosInstance);
    setApiBase(base?: string): void;
    getNonce(props: {
        account_type: TAccountType;
    }): Promise<string>;
    getEmailCode(props: {
        account_type: TAccountType;
        email: string;
    }): Promise<string>;
    emailLogin(props: IEmailLoginParams): Promise<{
        data: ILoginResponse;
    }>;
    walletLogin(props: IWalletLoginParams): Promise<{
        data: ILoginResponse;
    }>;
    tonLogin(props: ITonLoginParams): Promise<{
        data: ILoginResponse;
    }>;
}
declare const _default: AccountApi;
export default _default;
