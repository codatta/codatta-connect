// Import required dependencies
import { useEffect, useMemo, useState } from "react";
import { SignInOptionItem } from "./wallet-option";
import TonConnect, { WalletInfo } from "@tonconnect/sdk";
import TransitionEffect from "./transition-effect";
import ControlHead from "./control-head";
import { Search } from "lucide-react";

// Wallet option component for displaying individual wallet choices
function TonWalletOption(props: {
  wallet: WalletInfo;
  onClick: (wallet: WalletInfo) => void;
}) {
  const { wallet, onClick } = props;
  const icon = (
    <img className="xc-rounded-md xc-h-5 xc-w-5" src={wallet.imageUrl} />
  );
  const title = wallet.name || "";

  return (
    <SignInOptionItem
      icon={icon}
      title={title}
      onClick={() => onClick(wallet)}
    />
  );
}

// Main TON wallet selection component
export default function TonWalletSelect(props: {
  connector: TonConnect;
  onSelect: (wallet: WalletInfo) => void;
  onBack: () => void;
}) {
  const { connector } = props;

  // Component state
  const [search, setSearch] = useState<string>();
  const [wallets, setWallets] = useState<WalletInfo[]>([]);

  // Filter wallets based on search input
  const walletList = useMemo(() => {
    if (!search) return wallets;
    return wallets.filter((wallet) => {
      return wallet.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, wallets]);

  // Handle search input changes
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  // Initialize wallet list from connector
  async function init() {
    const wallets = await connector.getWallets();
    setWallets(wallets);
    console.log(wallets);
  }

  // Initialize component on mount
  useEffect(() => {
    init();
  }, []);

  // Handle wallet selection
  function handleSelectWallet(wallet: WalletInfo) {
    props.onSelect(wallet);
  }

  return (
    <TransitionEffect>
      <div className="xc-mb-6">
        <ControlHead title={"Select wallet"} onBack={props.onBack} />
      </div>
      {/* Search input section */}
      <div className="xc-mb-6 xc-flex xc-gap-3 xc-px-4 xc-py-2 xc-border xc-rounded-xl xc-w-full xc-overflow-hidden xc-items-center xc-border-opacity-15 xc-border-white focus-within:xc-border-opacity-40">
        <Search className="xc-shrink-0 xc-opacity-50"></Search>
        <input
          type="text"
          className="xc-flex-1 xc-bg-transparent xc-appearance-none xc-outline-none"
          placeholder="Search wallet"
          onInput={handleSearch}
        />
      </div>
      {/* Wallet list section */}
      <div className="xc-mb-4 xc-flex xc-h-[309px] xc-flex-col xc-gap-4 xc-overflow-scroll no-scrollbar">
        {walletList?.map((wallet) => (
          <TonWalletOption
            key={wallet.name}
            wallet={wallet}
            onClick={handleSelectWallet}
          ></TonWalletOption>
        ))}
      </div>
    </TransitionEffect>
  );
}
