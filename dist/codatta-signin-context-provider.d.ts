import { WalletItem } from './types/wallet-item.class';
import { TDeviceType } from './api/account.api';
export declare const coinbaseWallet: {
    getProvider: () => import('@coinbase/wallet-sdk').ProviderInterface;
};
interface CodattaConnectConfig {
    apiBaseUrl?: string;
    channel: string;
    device: TDeviceType;
    app: string;
    inviderCode: string;
    relateInfo?: Object;
}
interface CodattaConnectContext {
    initialized: boolean;
    wallets: WalletItem[];
    featuredWallets: WalletItem[];
    lastUsedWallet: WalletItem | null;
    saveLastUsedWallet: (wallet: WalletItem) => void;
    config: CodattaConnectConfig;
}
export declare function useCodattaConnectContext(): CodattaConnectContext;
interface CodattaConnectContextProviderProps {
    children: React.ReactNode;
    config: CodattaConnectConfig;
}
export declare function CodattaConnectContextProvider(props: CodattaConnectContextProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
