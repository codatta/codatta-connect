// Import necessary dependencies and components
import { useEffect, useState } from "react";
import SigninIndex from "./components/signin-index";
import EmailLoginWidget from "./components/email-login";
import EvmWalletLoginWidget from "./components/evm-wallet-login-widget";
import TonWalletLoginWidget from "./components/ton-wallet-login-widget";
import AnimateContainer from "./components/animate-container";
import { WalletItem } from "./types/wallet-item.class";
import EvmWalletSelect from "./components/evm-wallet-select";
import { ILoginResponse } from "./api/account.api";
import {
  CodattaSigninConfig,
  CodattaSinginContextProvider,
} from "./providers/codatta-signin-context-provider";

// Define the possible steps in the signin flow
type TStep =
  | "index"
  | "email"
  | "evm-wallet"
  | "all-wallet"
  | "ton-wallet"
  | "";

// Main signin component that handles the authentication flow
export function CodattaSignin(props: {
  onLogin: (res: ILoginResponse) => Promise<void>;
  header?: React.ReactNode;
  showEmailSignIn?: boolean;
  showTonConnect?: boolean;
  showMoreWallets?: boolean;
  showFeaturedWallets?: boolean;
  config: CodattaSigninConfig;
}) {
  // Destructure props with default values
  const {
    onLogin,
    header,
    showEmailSignIn = true,
    showMoreWallets = true,
    showTonConnect = true,
    showFeaturedWallets = true,
  } = props;

  // State management for the signin flow
  const [step, setStep] = useState<TStep>("");
  const [wallet, setWallet] = useState<WalletItem | null>(null);
  const [email, setEmail] = useState<string>("");

  // Handler for when a wallet is selected
  function handleSelectWallet(wallet: WalletItem) {
    setWallet(wallet);
    setStep("evm-wallet");
  }

  // Handler for when email signin is selected
  function handleSelectEmail(email: string) {
    setStep("email");
    setEmail(email);
  }

  // Handler for successful login
  async function hanleLoginSuccess(res: ILoginResponse) {
    await onLogin(res);
  }

  // Handler for TON wallet selection
  function onSelectTonConnect() {
    setStep("ton-wallet");
  }

  // Set initial step to index on component mount
  useEffect(() => {
    setStep("index");
  }, []);

  // Render the signin interface with different components based on current step
  return (
    <CodattaSinginContextProvider config={props.config}>
      <AnimateContainer className="xc-rounded-2xl xc-transition-height xc-box-content xc-w-full xc-min-w-[277px] xc-max-w-[420px] xc-p-6 xc-bg-[rgb(28,28,38)] xc-text-white">
        {/* EVM Wallet login step */}
        {step === "evm-wallet" && (
          <EvmWalletLoginWidget
            onBack={() => setStep("index")}
            onLogin={hanleLoginSuccess}
            wallet={wallet!}
          ></EvmWalletLoginWidget>
        )}
        {/* TON Wallet login step */}
        {step === "ton-wallet" && (
          <TonWalletLoginWidget
            onBack={() => setStep("index")}
            onLogin={hanleLoginSuccess}
          ></TonWalletLoginWidget>
        )}
        {/* Email login step */}
        {step === "email" && (
          <EmailLoginWidget
            email={email}
            onBack={() => setStep("index")}
            onLogin={hanleLoginSuccess}
          />
        )}
        {/* Initial signin options step */}
        {step === "index" && (
          <SigninIndex
            header={header}
            onEmailConfirm={handleSelectEmail}
            onSelectWallet={handleSelectWallet}
            onSelectMoreWallets={() => {
              setStep("all-wallet");
            }}
            onSelectTonConnect={onSelectTonConnect}
            config={{
              showEmailSignIn: showEmailSignIn,
              showFeaturedWallets: showFeaturedWallets,
              showMoreWallets: showMoreWallets,
              showTonConnect: showTonConnect,
            }}
          ></SigninIndex>
        )}
        {/* All wallets selection step */}
        {step === "all-wallet" && (
          <EvmWalletSelect
            onBack={() => setStep("index")}
            onSelectWallet={handleSelectWallet}
          ></EvmWalletSelect>
        )}
      </AnimateContainer>
    </CodattaSinginContextProvider>
  );
}
