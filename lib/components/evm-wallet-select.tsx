import { useMemo, useState } from "react"
import { useCodattaConnectContext } from "../codatta-connect-context-provider"
import { WalletItem } from "../types/wallet-item.class"
import ControlHead from "./control-head"
import TransitionEffect from "./transition-effect"
import { WalletOption } from "./wallet-option"
import { Search } from 'lucide-react'


function Empty() {

  return <svg width="121" height="120" viewBox="0 0 121 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" width="120" height="120" rx="60" fill="#404049" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M52.8709 61.106C52.8208 61.4482 52.7948 61.7979 52.7948 62.1535C52.7948 66.2529 56.2445 69.5761 60.5 69.5761C64.7554 69.5761 68.2052 66.2529 68.2052 62.1535C68.2052 61.7979 68.1792 61.4482 68.129 61.106H86.826V77.6174C86.826 78.6422 85.9636 79.473 84.8997 79.473H36.1002C35.0364 79.473 34.174 78.6422 34.174 77.6174V61.106H52.8709Z" fill="#252532" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M69.061 60.9416C69.061 65.6697 65.2281 69.5026 60.5 69.5026C55.7719 69.5026 51.939 65.6697 51.939 60.9416C51.939 60.7884 51.943 60.6362 51.951 60.485H33.5L39.7959 41.8696C40.0673 41.0671 40.8202 40.527 41.6674 40.527H79.3326C80.1798 40.527 80.9327 41.0671 81.2041 41.8696L87.5 60.485H69.049C69.057 60.6362 69.061 60.7884 69.061 60.9416Z" fill="#252532" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M67.8081 61.5708C67.8081 65.2243 64.5361 68.8446 60.4999 68.8446C56.4637 68.8446 53.1918 65.2243 53.1918 61.5708C53.1918 61.4524 53.1952 60.6762 53.202 60.5594H39.4268L44.8013 47.4919C45.033 46.8717 45.6757 46.4543 46.3989 46.4543H74.601C75.3242 46.4543 75.9669 46.8717 76.1986 47.4919L81.5731 60.5594H67.7979C67.8046 60.6762 67.8081 61.4524 67.8081 61.5708Z" fill="#404049" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M34.3232 60.6199V78.063C34.3232 78.6995 34.8392 79.2155 35.4757 79.2155H85.5245C86.1609 79.2155 86.6769 78.6995 86.6769 78.063V60.6199L80.4244 42.1328C80.2661 41.6647 79.8269 41.3496 79.3327 41.3496H41.6674C41.1733 41.3496 40.7341 41.6647 40.5758 42.1328L34.3232 60.6199Z" stroke="#77777D" stroke-width="2" />
    <path d="M34.817 60.2823C37.4094 60.2823 48.1095 60.2823 51.1124 60.2823C52.348 60.2823 52.348 61.1507 52.348 61.5994C52.348 65.9638 55.9675 69.5019 60.4323 69.5019C64.8971 69.5019 68.5165 65.9638 68.5165 61.5994C68.5165 61.1507 68.5165 60.2823 69.7521 60.2823H86.1829" stroke="#77777D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

}

export default function WalletList(props: {
  onBack: () => void,
  onSelectWallet: (wallet: WalletItem) => void
}) {

  const { wallets } = useCodattaConnectContext()
  const [search, setSearch] = useState<string>()

  const walletList = useMemo(() => {
    if (!search) return wallets
    return wallets.filter((wallet) => {
      return wallet.key.toLowerCase().includes(search.toLowerCase())
    })
  }, [search])

  function handleWalletClick(wallet: WalletItem) {
    props.onSelectWallet(wallet)
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  return <TransitionEffect>
    <div className="xc-mb-6">
      <ControlHead title={'Select wallet'} onBack={props.onBack} />
    </div>
    <div className="xc-mb-6 xc-flex xc-gap-3 xc-px-4 xc-py-2 xc-border xc-rounded-xl xc-w-full xc-overflow-hidden xc-items-center xc-border-opacity-15 xc-border-white focus-within:xc-border-opacity-40">
      <Search className="xc-shrink-0 xc-opacity-50"></Search>
      <input type="text" className="xc-flex-1 xc-bg-transparent xc-appearance-none xc-outline-none" placeholder='Search wallet' onInput={handleSearch} />
    </div>
    <div className="xc-mb-4 xc-flex xc-h-[309px] xc-flex-col xc-gap-4 xc-overflow-scroll no-scrollbar">
      {walletList.length ? walletList.map((wallet) => (
        <WalletOption
          wallet={wallet}
          key={`feature-${wallet.key}`}
          onClick={handleWalletClick}
        ></WalletOption>
      )) : <Empty></Empty>}
    </div>

  </TransitionEffect>
}