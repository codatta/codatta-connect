import { WalletItem } from '../types/wallet-item.class';
export default function WalletQr(props: {
    wallet: WalletItem;
    onGetExtension: () => void;
    onSignFinish: (wallet: WalletItem, signInfo: {
        message: string;
        nonce: string;
        signature: string;
        address: string;
        wallet_name: string;
    }) => Promise<void>;
}): import("react/jsx-runtime").JSX.Element;
