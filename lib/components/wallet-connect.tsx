// Import necessary dependencies
import { useEffect, useRef, useState } from "react";
import { createSiweMessage } from "viem/siwe";
import accountApi from "../api/account.api";
import { Loader2 } from "lucide-react";
import { WalletItem } from "../types/wallet-item.class";
import { useCodattaConnectContext } from "../codatta-connect-context-provider";

// Constants for user guidance messages
const CONNECT_GUIDE_MESSAGE = "Accept connection request in the wallet";
const MESSAGE_SIGN_GUIDE_MESSAGE = "Accept sign-in request in your wallet";

// Helper function to create SIWE (Sign-In with Ethereum) message
function getSiweMessage(address: `0x${string}`, nonce: string) {
  const domain = window.location.host;
  const uri = window.location.href;
  const message = createSiweMessage({
    address: address,
    chainId: 1,
    domain,
    nonce,
    uri,
    version: "1",
  });
  return message;
}

// Main WalletConnect component for handling wallet connections and signatures
export default function WalletConnect(props: {
  wallet: WalletItem;
  onSignFinish: (
    wallet: WalletItem,
    params: {
      message: string;
      nonce: string;
      signature: string;
      address: string;
      wallet_name: string;
    }
  ) => Promise<void>;
  onShowQrCode: () => void;
}) {
  // State and ref declarations
  const [error, setError] = useState<string>();
  const { wallet, onSignFinish } = props;
  const nonce = useRef<string>();
  const [guideType, setGuideType] = useState<"connect" | "sign" | "waiting">(
    "connect"
  );
  const { saveLastUsedWallet } = useCodattaConnectContext();

  // Handle wallet signin process
  async function walletSignin(nonce: string) {
    try {
      setGuideType("connect");
      const address = await wallet.connect();
      if (!address || address.length === 0) {
        throw new Error("Wallet connect error");
      }
      const message = getSiweMessage(address[0], nonce);
      setGuideType("sign");
      const signature = await wallet.signMessage(message, address[0]);
      if (!signature || signature.length === 0) {
        throw new Error("user sign error");
      }
      setGuideType("waiting");
      await onSignFinish(wallet, {
        address: address[0],
        signature,
        message,
        nonce,
        wallet_name: wallet.config?.name || "",
      });
      saveLastUsedWallet(wallet);
    } catch (err: any) {
      console.log(err.details);
      setError(err.details || err.message);
    }
  }

  // Commented out QR code handler
  // function handleShowQrCode() {
  //   setError('')
  //   onShowQrCode()
  // }

  // Initialize wallet connection process
  async function initWalletConnect() {
    try {
      setError("");
      const res = await accountApi.getNonce({ account_type: "block_chain" });
      nonce.current = res;
      walletSignin(nonce.current);
    } catch (err: any) {
      console.log(err.details);
      setError(err.message);
    }
  }

  // Start connection process on component mount
  useEffect(() => {
    initWalletConnect();
  }, []);

  // Render wallet connection interface
  return (
    <div className="xc-flex xc-flex-col xc-items-center xc-justify-center xc-gap-4">
      {/* Wallet icon */}
      <img
        className="xc-rounded-md xc-h-16 xc-w-16"
        src={wallet.config?.image}
        alt=""
      />

      {/* Error handling UI */}
      {error && (
        <div className="xc-flex xc-flex-col xc-items-center">
          <p className="xc-text-danger xc-mb-2 xc-text-center">{error}</p>
          <div className="xc-flex xc-gap-2">
            <button
              className="xc-rounded-full xc-bg-white xc-bg-opacity-10 xc-px-6 xc-py-1"
              onClick={initWalletConnect}
            >
              Retry
            </button>
          </div>
        </div>
      )}
      {/* Status messages UI */}
      {!error && (
        <>
          {guideType === "connect" && (
            <span className="xc-text-center">{CONNECT_GUIDE_MESSAGE}</span>
          )}
          {guideType === "sign" && (
            <span className="xc-text-center">{MESSAGE_SIGN_GUIDE_MESSAGE}</span>
          )}
          {guideType === "waiting" && (
            <span className="xc-text-center">
              <Loader2 className="xc-animate-spin"></Loader2>
            </span>
          )}
        </>
      )}
    </div>
  );
}
