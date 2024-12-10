import { WalletItem } from '../types/wallet-item.class';
export default function WalletConnectWidget(props: {
    wallet: WalletItem;
    onConnect: (wallet: WalletItem) => void;
    onBack: () => void;
}): import("react/jsx-runtime").JSX.Element;
