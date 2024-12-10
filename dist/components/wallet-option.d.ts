import { WalletItem } from '../types/wallet-item.class';
export declare function SignInOptionItem(props: {
    icon: React.ReactNode;
    title: string;
    extra?: React.ReactNode;
    onClick?: () => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function WalletOption(props: {
    wallet: WalletItem;
    onClick: (wallet: WalletItem) => void;
}): import("react/jsx-runtime").JSX.Element;
