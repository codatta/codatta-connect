import { WalletClient } from 'viem';
import { WalletConfig } from '../constant/wallet-book';
import { default as UniversalProvider } from '@walletconnect/universal-provider';
import { EIP6963ProviderDetail } from '../utils/eip6963-detect';
export declare class WalletItem {
    private _key;
    private _config;
    private _provider;
    private _connected;
    private _address;
    private _fatured;
    private _installed;
    lastUsed: boolean;
    get connected(): boolean;
    get featured(): boolean;
    get key(): string;
    get installed(): boolean;
    get client(): WalletClient | null;
    get config(): WalletConfig | null;
    static fromWalletConfig(config: WalletConfig): WalletItem;
    constructor(params: EIP6963ProviderDetail);
    constructor(params: WalletConfig);
    constructor(params: UniversalProvider);
    EIP6963Detected(detail: EIP6963ProviderDetail): void;
    setUniversalProvider(provider: UniversalProvider): void;
    private testConnect;
    connect(): Promise<`0x${string}`[]>;
    getAddress(): Promise<`0x${string}`>;
    getChain(): Promise<number>;
    signMessage(message: string): Promise<`0x${string}` | undefined>;
    disconnect(): Promise<void>;
}
