import { default as TonConnect, WalletInfo } from '@tonconnect/sdk';
export default function TonWalletSelect(props: {
    connector: TonConnect;
    onSelect: (wallet: WalletInfo) => void;
    onBack: () => void;
}): import("react/jsx-runtime").JSX.Element;
