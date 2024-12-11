import { WalletItem } from '../types/wallet-item.class';
export default function WalletList(props: {
    onBack: () => void;
    onSelectWallet: (wallet: WalletItem) => void;
}): import("react/jsx-runtime").JSX.Element;
