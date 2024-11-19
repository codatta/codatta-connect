const logoImg = 'https://s.xny.ai/xny-connect/wallet-icons.svg#codatta-black'
const ImageTonIcon = 'https://s.xny.ai/xny-connect/wallet-icons.svg#ton'

import { useEffect, useMemo } from 'react'
import { Mail, ArrowRight, ChevronRight } from 'lucide-react'
import { useCodattaSigninContext } from '../codatta-signin-context-provider'
import { WalletItem } from '../types/wallet-item.class'
import TransitionEffect from './transition-effect'

function SignInOptionItem(props: {
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
      className="xc-rounded-lg xc-group xc-flex xc-cursor-pointer xc-items-center xc-gap-2 xc-border xc-border-gray-100 xc-px-4 xc-py-2 xc-transition-all xc-hover:shadow-lg"
      onClick={handleClick}
    >
      {icon}
      {title}
      <div className="xc-relative xc-ml-auto xc-h-6">
        <div className="xc-relative xc-left-0 xc-opacity-100 xc-transition-all xc-group-hover:left-2 xc-group-hover:opacity-0">
          {extra}
        </div>
        <div className="xc-absolute xc-right-2 xc-top-0 xc-text-gray-400 xc-opacity-0 xc-transition-all xc-group-hover:right-0 xc-group-hover:opacity-100">
          <ChevronRight></ChevronRight>
        </div>
      </div>
    </div>
  )
}

function getExtra(wallet: WalletItem) {
  if (wallet.state?.connected) {
    return (
      <div className="xc-flex xc-items-center xc-gap-2 xc-rounded-full xc-py-1 xc-text-xs xc-text-gray-500">
        <div className="xc-bg-green xc-h-1 xc-w-1 xc-rounded-full"></div>
        connected
      </div>
    )
  }

  if (wallet.state?.lastUsed) {
    return (
      <div className="xc-flex xc-items-center xc-gap-2 xc-rounded-full xc-py-1 xc-text-xs xc-text-gray-500">
        <div className="xc-h-1 xc-w-1 xc-rounded-full xc-bg-[#009E8C]"></div>
        Last Used
      </div>
    )
  }

  if (wallet.state?.detected) {
    return (
      <div className="xc-flex xc-items-center xc-gap-2 xc-rounded-full xc-py-1 xc-text-xs xc-text-gray-500">
        <div className="xc-h-1 xc-w-1 xc-rounded-full xc-bg-[#2596FF]"></div>
        Installed
      </div>
    )
  }

  return null
}

function WalletOption(props: { wallet: WalletItem; onClick: (wallet: WalletItem) => void }) {
  const { wallet, onClick } = props
  const icon = <img className="xc-rounded-md xc-h-5 xc-w-5" src={wallet.info.image} />
  const title = wallet.info.name
  const extra = useMemo(() => getExtra(wallet), [wallet])

  return <SignInOptionItem icon={icon} title={title} extra={extra} onClick={() => onClick(wallet)} />
}

function MoreWallets(props: { children?: React.ReactNode; onClick?: () => void }) {
  const { children, onClick } = props

  function handleClickMore() {
    onClick && onClick()
  }

  return (
    <div className="xc-flex xc-items-center xc-gap-3">
      <hr className="xc-flex-1 xc-border-gray-200" />
      <div className="xc-shrink-0 xc-cursor-pointer" onClick={handleClickMore}>
        {children || (
          <div className="xc-flex xc-items-center xc-gap-2">
            <span className="xc-text-sm">View more wallets</span>
            <ArrowRight size={16}></ArrowRight>
          </div>
        )}
      </div>
      <hr className="xc-flex-1 xc-border-gray-200" />
    </div>
  )
}

export default function SingInIndex(props: {
  onSelectEmail: () => void
  onSelectWallet: (walletOption: WalletItem) => void
  onSelectMoreWallets: () => void
  onSelectTonConnect: () => void
  config: {
    showEmailSignIn?: boolean
    showTonConnect?: boolean
    showFeaturedWallets?: boolean
    showInstalledWallets?: boolean
    showMoreWallets?: boolean
    title?: string
  }
}) {
  const { featuredWallets, installedWallets } = useCodattaSigninContext()
  const { onSelectEmail, onSelectWallet, onSelectMoreWallets, onSelectTonConnect, config } = props

  function handleWalletClick(wallet: WalletItem) {
    onSelectWallet(wallet)
  }

  function handleEmailClick() {
    onSelectEmail()
  }

  useEffect(() => {
  }, [])

  return (
    <TransitionEffect>
      <div className="xc-mb-12">
        <img className="xc-mb-3 xc-h-8" src={logoImg} alt="" />
        <h1 className="xc-text-lg xc-font-bold">{config.title || 'Log in to codatta'} </h1>
      </div>

      {config.showEmailSignIn && (
        <div className="xc-mb-6">
          <h2 className="xc-mb-3">Log in with email</h2>
          <SignInOptionItem icon={<Mail size={18}></Mail>} title="Email" onClick={handleEmailClick} />
        </div>
      )}

      <div>
        {/* <h2 className="mb-3">Log in with wallet</h2> */}
        <div className="xc-mb-4 xc-flex xc-max-h-[309px] xc-flex-col xc-gap-4 xc-overflow-scroll">
          {config.showFeaturedWallets &&
            featuredWallets.map((wallet) => (
              <WalletOption
                wallet={wallet}
                key={`feature-${wallet.info.key}`}
                onClick={handleWalletClick}
              ></WalletOption>
            ))}
          {config.showTonConnect && (
            <SignInOptionItem
              icon={<img className="xc-h-5 xc-w-5" src={ImageTonIcon}></img>}
              title="TON Connect"
              onClick={onSelectTonConnect}
            ></SignInOptionItem>
          )}
          {config.showInstalledWallets &&
            installedWallets.map((wallet:any) => (
              <WalletOption
                wallet={wallet}
                key={`installed-${wallet.info.key}`}
                onClick={handleWalletClick}
              ></WalletOption>
            ))}
        </div>
        {config.showMoreWallets && <MoreWallets onClick={onSelectMoreWallets} />}
      </div>
    </TransitionEffect>
  )
}
