import { WalletItem } from '../types/wallet-item.class';
import { ILoginResponse } from '../api/account.api';
export default function WalletLogin(props: {
    wallet: WalletItem;
    onLogin: (res: ILoginResponse) => void;
    onBack: () => void;
}): import("react/jsx-runtime").JSX.Element;
