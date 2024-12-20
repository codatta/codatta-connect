import { useMemo } from "react"
import { WalletItem } from "../types/wallet-item.class"
import { ChevronRight } from "lucide-react"

export function SignInOptionItem(props: {
  icon: React.ReactNode
  title: string
  extra?: React.ReactNode
  onClick?: () => void
}) {
  const { icon, title, extra, onClick } = props

  function handleClick() {
    onClick && onClick()
  }

  return (
    <div
      className="xc-rounded-lg xc-group xc-flex xc-cursor-pointer xc-items-center xc-gap-2 xc-border xc-border-white xc-border-opacity-15 xc-px-4 xc-py-2 xc-transition-all hover:xc-shadow-lg"
      onClick={handleClick}
    >
      {icon}
      {title}
      <div className="xc-relative xc-ml-auto xc-h-6">
        <div className="xc-relative xc-left-0 xc-opacity-100 xc-transition-all group-hover:xc-left-2 group-hover:xc-opacity-0">
          {extra}
        </div>
        <div className="xc-absolute xc-right-2 xc-top-0 xc-text-gray-400 xc-opacity-0 xc-transition-all group-hover:xc-right-0 group-hover:xc-opacity-100">
          <ChevronRight></ChevronRight>
        </div>
      </div>
    </div>
  )
}

function getExtra(wallet: WalletItem) {
  // if (wallet.connected) {
  //   return (
  //     <div className="xc-flex xc-items-center xc-gap-2 xc-rounded-full xc-py-1 xc-text-xs xc-text-gray-500">
  //       <div className="xc-bg-green xc-h-1 xc-w-1 xc-rounded-full xc-bg-[#009E8C]"></div>
  //       connected
  //     </div>
  //   )
  // }

  if (wallet.lastUsed) {
    return (
      <div className="xc-flex xc-items-center xc-gap-2 xc-rounded-full xc-py-1 xc-text-xs xc-text-gray-500">
        <div className="xc-h-1 xc-w-1 xc-rounded-full xc-bg-[#009E8C]"></div>
        Last Used
      </div>
    )
  }

  if (wallet.installed) {
    return (
      <div className="xc-flex xc-items-center xc-gap-2 xc-rounded-full xc-py-1 xc-text-xs xc-text-gray-500">
        <div className="xc-h-1 xc-w-1 xc-rounded-full xc-bg-[#2596FF]"></div>
        Installed
      </div>
    )
  }

  return null
}

export function WalletOption(props: { wallet: WalletItem; onClick: (wallet: WalletItem) => void }) {
  const { wallet, onClick } = props
  const icon = <img className="xc-rounded-md xc-h-5 xc-w-5" src={wallet.config?.image} />
  const title = wallet.config?.name || ''
  const extra = useMemo(() => getExtra(wallet), [wallet])

  return <SignInOptionItem icon={icon} title={title} extra={extra} onClick={() => onClick(wallet)} />
}
