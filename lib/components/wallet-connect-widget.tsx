// Import required dependencies
import { useState } from "react";
import ControlHead from "./control-head";
import TransitionEffect from "./transition-effect";
import WalletQr from "./wallet-qr";
import WalletConnect from "./wallet-connect";
import GetWallet from "./get-wallet";
import { WalletItem } from "../types/wallet-item.class";

/**
 * WalletConnectWidget component handles the wallet connection flow
 *
 * @param props.wallet - The wallet item to connect
 * @param props.onConnect - Callback when wallet is successfully connected
 * @param props.onBack - Callback to go back to previous screen
 */
export default function WalletConnectWidget(props: {
  wallet: WalletItem;
  onConnect: (wallet: WalletItem) => void;
  onBack: () => void;
}) {
  const { wallet, onConnect } = props;
  // Set initial step based on whether wallet is installed
  const [step, setStep] = useState(wallet.installed ? "connect" : "qr");

  // Handle successful wallet connection
  async function handleSignFinish() {
    onConnect(wallet);
  }

  return (
    <TransitionEffect>
      {/* Header section */}
      <div className="mb-6">
        <ControlHead title={"Connect wallet"} onBack={props.onBack} />
      </div>

      {/* QR code scanning step */}
      {step === "qr" && (
        <WalletQr
          wallet={wallet}
          onGetExtension={() => setStep("get-extension")}
          onSignFinish={handleSignFinish}
        ></WalletQr>
      )}

      {/* Direct wallet connection step */}
      {step === "connect" && (
        <WalletConnect
          onShowQrCode={() => setStep("qr")}
          wallet={wallet}
          onSignFinish={handleSignFinish}
        ></WalletConnect>
      )}

      {/* Wallet extension installation step */}
      {step === "get-extension" && <GetWallet wallet={wallet}></GetWallet>}
    </TransitionEffect>
  );
}
