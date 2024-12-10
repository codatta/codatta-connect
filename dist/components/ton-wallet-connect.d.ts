import { default as TonConnect, WalletInfoInjectable, WalletInfoRemote } from '@tonconnect/sdk';
export default function TonWalletConnect(props: {
    connector: TonConnect;
    wallet: WalletInfoRemote | WalletInfoInjectable;
    onBack: () => void;
}): import("react/jsx-runtime").JSX.Element;
