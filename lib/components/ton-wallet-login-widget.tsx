// Import required dependencies
import { useEffect, useState } from "react";
import TransitionEffect from "./transition-effect";
import accountApi, { ILoginResponse } from "../api/account.api";
import TonWalletSelect from "./ton-wallet-select";
import TonConnect, {
  Wallet,
  WalletInfo,
  WalletInfoInjectable,
  WalletInfoRemote,
} from "@tonconnect/sdk";
import TonWalletConnect from "./ton-wallet-connect";
import { useCodattaSigninContext } from "@/providers/codatta-signin-context-provider";

// Define step types for wallet connection flow
type TStep = "select" | "connect" | "get-extension" | "";

// Main TON wallet login widget component
export default function TonWalletLoginWidget(props: {
  onLogin: (res: ILoginResponse) => void;
  onBack: () => void;
}) {
  // Component state
  const [step, setStep] = useState<TStep>("");
  const [wallet, setWallet] = useState<
    WalletInfoRemote | WalletInfoInjectable
  >();
  const [connector, setConnector] = useState<TonConnect>();
  const config = useCodattaSigninContext();
  const [loading, setLoading] = useState(false);

  // Handle wallet connection status changes
  async function handleStatusChange(status: Wallet | null) {
    if (!status) return;
    if (!status.connectItems?.tonProof) return;
    setLoading(true);
    // Call login API with wallet connection details
    const res = await accountApi.tonLogin({
      account_type: "block_chain",
      connector: "codatta_ton",
      account_enum: "C",
      wallet_name: status?.device.appName,
      inviter_code: config.inviterCode,
      address: status.account.address,
      chain: status.account.chain,
      connect_info: [
        { name: "ton_addr", network: status.account.chain, ...status.account },
        status.connectItems?.tonProof,
      ],
      source: {
        device: config.device,
        channel: config.channel,
        app: config.app,
      },
    });
    await props.onLogin(res.data);
    setLoading(false);
  }

  // Initialize TON Connect on component mount
  useEffect(() => {
    const connector = new TonConnect({
      manifestUrl:
        "https://static.codatta.io/static/tonconnect-manifest.json?v=2",
    });

    // Subscribe to wallet status changes
    const unsubscribe = connector.onStatusChange(handleStatusChange);
    setConnector(connector);
    setStep("select");
    return unsubscribe;
  }, []);

  // Handle wallet selection
  function handleSelectWallet(wallet: WalletInfo) {
    setStep("connect");
    setWallet(wallet);
  }

  // Render wallet connection flow steps
  return (
    <TransitionEffect>
      {step === "select" && (
        <TonWalletSelect
          connector={connector!}
          onSelect={handleSelectWallet}
          onBack={props.onBack}
        ></TonWalletSelect>
      )}
      {step === "connect" && (
        <TonWalletConnect
          connector={connector!}
          wallet={wallet!}
          onBack={props.onBack}
          loading={loading}
        ></TonWalletConnect>
      )}
    </TransitionEffect>
  );
}
