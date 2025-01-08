// Import required dependencies
import { createContext, useContext, useEffect, useState } from "react";
import { WalletBook } from "./constant/wallet-book";
import { WalletItem } from "./types/wallet-item.class";
import UniversalProvider, {
  UniversalProviderOpts,
} from "@walletconnect/universal-provider";
import { EIP6963Detect } from "./utils/eip6963-detect";
import { createCoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import accountApi from "./api/account.api";

// Configuration for WalletConnect
const walletConnectConfig: UniversalProviderOpts = {
  projectId: "7a4434fefbcc9af474fb5c995e47d286",
  metadata: {
    name: "codatta",
    description: "codatta",
    url: "https://codatta.io/",
    icons: ["https://avatars.githubusercontent.com/u/171659315"],
  },
};

// Initialize Coinbase Wallet SDK
export const coinbaseWallet = createCoinbaseWalletSDK({
  appName: "codatta",
  appLogoUrl: "https://avatars.githubusercontent.com/u/171659315",
});

// Commented out configuration interface
// interface CodattaConnectConfig {
//   apiBaseUrl?: string,
//   channel: string,
//   device: TDeviceType
//   app: string,
//   inviderCode: string,
//   relateInfo?: Object
// }

// Define the context interface
interface CodattaConnectContext {
  initialized: boolean;
  wallets: WalletItem[];
  featuredWallets: WalletItem[];
  lastUsedWallet: WalletItem | null;
  saveLastUsedWallet: (wallet: WalletItem) => void;
}

// Create context with default values
const CodattaSigninContext = createContext<CodattaConnectContext>({
  saveLastUsedWallet: () => {},
  lastUsedWallet: null,
  wallets: [],
  initialized: false,
  featuredWallets: [],
});

// Hook to use the Codatta Connect context
export function useCodattaConnectContext() {
  return useContext(CodattaSigninContext);
}

// Props interface for the context provider
interface CodattaConnectContextProviderProps {
  children: React.ReactNode;
  apiBaseUrl?: string;
}

// Main context provider component
export function CodattaConnectContextProvider(
  props: CodattaConnectContextProviderProps
) {
  const { apiBaseUrl } = props;
  const [wallets, setWallets] = useState<WalletItem[]>([]);
  const [featuredWallets, setFeaturedWallets] = useState<WalletItem[]>([]);
  const [lastUsedWallet, setLastUsedWallet] = useState<WalletItem | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Handler for saving the last used wallet
  const saveLastUsedWallet = (wallet: WalletItem) => {
    console.log("saveLastUsedWallet", wallet);
  };

  // Sort wallets by featured/installed status
  function sortWallet(wallets: WalletItem[]) {
    const featuredWallets = wallets.filter(
      (item) => item.featured || item.installed
    );
    const restWallets = wallets.filter(
      (item) => !item.featured && !item.installed
    );
    const sortedWallets = [...featuredWallets, ...restWallets];
    setWallets(sortedWallets);
    setFeaturedWallets(featuredWallets);
  }

  // Initialize wallet list and detect providers
  async function init() {
    const wallets: WalletItem[] = [];
    const walletMap = new Map<string, WalletItem>();

    // Initialize wallets from WalletBook
    WalletBook.forEach((item) => {
      const walletItem = new WalletItem(item);
      if (item.name === "Coinbase Wallet") {
        walletItem.EIP6963Detected({
          info: {
            name: "Coinbase Wallet",
            uuid: "coinbase",
            icon: item.image,
            rdns: "coinbase",
          },
          provider: coinbaseWallet.getProvider() as any,
        });
      }
      walletMap.set(walletItem.key, walletItem);
      wallets.push(walletItem);
    });

    // Detect and handle EIP6963 providers
    const eip6963Providers = await EIP6963Detect();
    eip6963Providers.forEach((detail) => {
      const walletItem = walletMap.get(detail.info.name);
      if (walletItem) {
        walletItem.EIP6963Detected(detail);
      } else {
        const walletItem = new WalletItem(detail);
        walletMap.set(walletItem.key, walletItem);
        wallets.push(walletItem);
      }
    });

    // Restore last used wallet and WalletConnect session
    try {
      const lastUsedInfo = JSON.parse(
        localStorage.getItem("xn-last-used-info") || "{}"
      );
      const lastUsedWallet = walletMap.get(lastUsedInfo.key);
      if (lastUsedWallet) {
        lastUsedWallet.lastUsed = true;
        if (lastUsedInfo.provider === "UniversalProvider") {
          const provider = await UniversalProvider.init(walletConnectConfig);
          if (provider.session) lastUsedWallet.setUniversalProvider(provider);
        }
        setLastUsedWallet(lastUsedWallet);
      }
    } catch (err) {
      console.log(err);
    }

    // Sort and update wallet list
    sortWallet(wallets);

    // Mark initialization as complete
    setInitialized(true);
  }

  // Initialize on component mount
  useEffect(() => {
    init();
    accountApi.setApiBase(apiBaseUrl);
  }, []);

  // Render context provider with values
  return (
    <CodattaSigninContext.Provider
      value={{
        saveLastUsedWallet,
        wallets,
        initialized,
        lastUsedWallet,
        featuredWallets,
      }}
    >
      {props.children}
    </CodattaSigninContext.Provider>
  );
}
