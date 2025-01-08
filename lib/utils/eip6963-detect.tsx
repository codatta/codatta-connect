import { EIP1193Provider } from "viem"

/**
 * Provider info interface according to EIP-6963 standard
 * @see https://eips.ethereum.org/EIPS/eip-6963
 */
interface EIP6963ProviderInfo {
  uuid: string; // Unique identifier for the provider
  name: string; // Display name of the provider/wallet
  icon: string; // Icon URL for the provider/wallet
  rdns: string; // Reverse domain name notation
}

/**
 * Complete provider detail interface combining info and provider instance
 */
export interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: EIP1193Provider; // The actual provider instance
}

/**
 * Detects EIP-6963 compatible wallet providers in the browser
 * @returns Promise resolving to array of detected wallet providers
 */
export function EIP6963Detect(): Promise<EIP6963ProviderDetail[]>  {
  return new Promise((resolve) => {
    const wallets: EIP6963ProviderDetail[] = [];
    let timer: NodeJS.Timeout;

    // Listen for provider announcements
    window.addEventListener("eip6963:announceProvider", (event: any) => {
      const { detail } = event as { detail: EIP6963ProviderDetail };
      if (timer) clearTimeout(timer);
      wallets.push(detail);
      // Resolve after a short delay to collect multiple announcements
      timer = setTimeout(() => resolve(wallets), 200);
    });

    // Fallback timer in case no providers announce
    timer = setTimeout(() => resolve(wallets), 200);

    // Request providers to announce themselves
    window.dispatchEvent(new Event("eip6963:requestProvider"));
  })
}