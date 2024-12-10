import { EIP1193Provider } from 'viem';
interface EIP6963ProviderInfo {
    uuid: string;
    name: string;
    icon: string;
    rdns: string;
}
export interface EIP6963ProviderDetail {
    info: EIP6963ProviderInfo;
    provider: EIP1193Provider;
}
export declare function EIP6963Detect(): Promise<EIP6963ProviderDetail[]>;
export {};
