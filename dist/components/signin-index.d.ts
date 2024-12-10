import { WalletItem } from '../types/wallet-item.class';
export default function SingInIndex(props: {
    onEmailConfirm: (email: string) => void;
    onSelectWallet: (walletOption: WalletItem) => void;
    onSelectMoreWallets: () => void;
    onSelectTonConnect: () => void;
    config: {
        showEmailSignIn?: boolean;
        showTonConnect?: boolean;
        showFeaturedWallets?: boolean;
        showInstalledWallets?: boolean;
        showMoreWallets?: boolean;
        title?: string;
    };
}): import("react/jsx-runtime").JSX.Element;
