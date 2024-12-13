import { TDeviceType } from '../api/account.api';
export interface CodattaSigninConfig {
    channel: string;
    device: TDeviceType;
    app: string;
    inviterCode: string;
}
export declare function useCodattaSigninContext(): CodattaSigninConfig;
interface CodattaConnectContextProviderProps {
    children: React.ReactNode;
    config: CodattaSigninConfig;
}
export declare function CodattaSinginContextProvider(props: CodattaConnectContextProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
