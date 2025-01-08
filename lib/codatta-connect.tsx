// Import required React hooks and components
import { useEffect, useState } from "react";
import SigninIndex from "./components/signin-index";
import AnimateContainer from "./components/animate-container";
import { WalletItem } from "./types/wallet-item.class";
import WalletConnectWidget from "./components/wallet-connect-widget";

// Main component for handling wallet connections
export default function CodattaConnect(props: {
  onSelectMoreWallets: () => void; // Callback when user clicks "More Wallets"
  onSelectTonConnect?: () => void; // Optional callback for TON Connect selection
  onConnect: (wallet: WalletItem) => Promise<void>; // Callback when wallet connects
}) {
  const { onSelectMoreWallets, onSelectTonConnect, onConnect } = props;
  // Track current step in connection flow
  const [step, setStep] = useState("");
  // Store selected wallet details
  const [wallet, setWallet] = useState<WalletItem | null>(null);

  // Handle wallet selection from the list
  function handleSelectWallet(wallet: WalletItem) {
    setWallet(wallet);
    setStep("wallet");
  }

  // Handle email input selection (currently unused)
  function handleSelectEmail(email: string) {
    console.log("handleSelectEmail", email);
    setStep("email");
  }

  // Handle wallet connection completion
  async function handleConnect(wallet: WalletItem) {
    await onConnect(wallet);
    setWallet(null);
    setStep("index");
  }

  // Initialize component with index step
  useEffect(() => {
    setStep("index");
  }, []);

  return (
    <AnimateContainer className="bg-gray rounded-6 transition-height box-content w-full min-w-[277px] max-w-[420px] p-6">
      {/* Show wallet connection widget when in wallet step */}
      {step === "wallet" && (
        <WalletConnectWidget
          onBack={() => setStep("index")}
          onConnect={handleConnect}
          wallet={wallet!}
        ></WalletConnectWidget>
      )}
      {/* Show main signin options when in index step */}
      {step === "index" && (
        <SigninIndex
          onEmailConfirm={handleSelectEmail}
          onSelectWallet={handleSelectWallet}
          onSelectMoreWallets={onSelectMoreWallets}
          onSelectTonConnect={onSelectTonConnect!}
          config={{
            showEmailSignIn: false,
            showFeaturedWallets: true,
            showMoreWallets: true,
            showTonConnect: false,
          }}
        ></SigninIndex>
      )}
    </AnimateContainer>
  );
}
