import { ILoginResponse } from './api/account.api';
import { CodattaSigninConfig } from './providers/codatta-signin-context-provider';
export declare function CodattaSignin(props: {
    onLogin: (res: ILoginResponse) => Promise<void>;
    header?: React.ReactNode;
    showEmailSignIn?: boolean;
    showTonConnect?: boolean;
    showMoreWallets?: boolean;
    showFeaturedWallets?: boolean;
    config: CodattaSigninConfig;
}): import("react/jsx-runtime").JSX.Element;
