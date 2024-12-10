import { WalletItem } from './types/wallet-item.class';
export default function CodattaConnect(props: {
    onSelectMoreWallets: () => void;
    onSelectTonConnect?: () => void;
    onConnect: (wallet: WalletItem) => Promise<void>;
}): import("react/jsx-runtime").JSX.Element;
