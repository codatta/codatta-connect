import { ILoginResponse } from '../api/account.api';
export default function TonWalletLoginWidget(props: {
    onLogin: (res: ILoginResponse) => void;
    onBack: () => void;
}): import("react/jsx-runtime").JSX.Element;
