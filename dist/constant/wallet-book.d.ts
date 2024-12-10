export type ChainType = 'evm' | 'sol' | 'ton' | 'btc';
export interface WalletConfig {
    name: string;
    image: string;
    featured: boolean;
    rdns?: string;
    getWallet?: {
        chrome_store_id?: string;
        edge_addon_id?: string;
        brave_store_id?: string;
        firefox_addon_id?: string;
        play_store_id?: string;
        app_store_id?: string;
        mac_app_store_id?: string;
    };
    deep_link?: string;
    webapp_link?: string;
    universal_link?: string;
    desktop_link?: string;
    tma_link?: string;
    injected?: {
        [key in ChainType]: string;
    };
}
export declare const WalletBook: WalletConfig[];
