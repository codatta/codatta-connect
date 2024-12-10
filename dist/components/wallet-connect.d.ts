import { WalletItem } from '../types/wallet-item.class';
export default function WalletConnect(props: {
    wallet: WalletItem;
    onSignFinish: (wallet: WalletItem, params: {
        message: string;
        nonce: string;
        signature: string;
        address: string;
        wallet_name: string;
    }) => Promise<void>;
    onShowQrCode: () => void;
}): import("react/jsx-runtime").JSX.Element;
