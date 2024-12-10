const logoImg = 'https://s.xny.ai/xny-connect/wallet-icons.svg?ver=2#codatta-black'
const ImageTonIcon = 'https://s.xny.ai/xny-connect/wallet-icons.svg#ton'

import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useCodattaConnectContext } from '../codatta-signin-context-provider'
import { WalletItem } from '../types/wallet-item.class'
import TransitionEffect from './transition-effect'
import { SignInOptionItem, WalletOption } from './wallet-option'
import Spliter from './ui/spliter'

function MoreWallets(props: { onClick?: () => void }) {
  const { onClick } = props

  function handleClickMore() {
    onClick && onClick()
  }

  return (
    <Spliter>
      <div className="xc-flex xc-items-center xc-gap-2 xc-cursor-pointer" onClick={handleClickMore}>
        <span className="xc-text-sm">View more wallets</span>
        <ArrowRight size={16}></ArrowRight>
      </div>
    </Spliter>
  )
}

export default function SingInIndex(props: {
  onEmailConfirm: (email: string) => void
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
  const [email, setEmail] = useState('')
  const { featuredWallets } = useCodattaConnectContext()
  const { onEmailConfirm, onSelectWallet, onSelectMoreWallets, onSelectTonConnect, config } = props

  const isEmail = useMemo(() => {
    const hasChinese =
      /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]/gu
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return !hasChinese.test(email) && isEmail.test(email)
  }, [email])

  function handleWalletClick(wallet: WalletItem) {
    onSelectWallet(wallet)
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  async function handleEmailLogin() {
    onEmailConfirm(email)
  }

  return (
    <TransitionEffect>
      <div className="xc-mb-8">
        <img className="xc-mb-3 xc-h-8" src={logoImg} alt="" />
        <h1 className="xc-text-lg xc-font-bold">{config.title || 'Log in to codatta'} </h1>
      </div>

      {config.showEmailSignIn && (
        <div className="xc-mb-4">
          <input className='xc-w-full xc-border xc-h-10 xc-rounded-lg xc-px-3 xc-mb-3' placeholder='Enter your email' type="email" onChange={handleEmailChange} />
          <button disabled={!isEmail} className='xc-bg-[rgb(135,93,255)] xc-text-white xc-w-full xc-rounded-lg xc-py-2 disabled:xc-opacity-45' onClick={handleEmailLogin}>Continue</button>
        </div>
      )}

      <div>
        <div className='xc-mb-4'>
          <Spliter> <span className='xc-text-sm'>OR</span></Spliter>
        </div>
        <div className="xc-mb-4 xc-flex xc-max-h-[309px] xc-flex-col xc-gap-4 xc-overflow-scroll">
          {featuredWallets &&
            featuredWallets.map((wallet) => (
              <WalletOption
                wallet={wallet}
                key={`feature-${wallet.key}`}
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
          {/* {config.showInstalledWallets &&
            installedWallets.map((wallet:any) => (
              <WalletOption
                wallet={wallet}
                key={`installed-${wallet.info.key}`}
                onClick={handleWalletClick}
              ></WalletOption>
            ))} */}
        </div>
        {config.showMoreWallets && <MoreWallets onClick={onSelectMoreWallets} />}
      </div>
    </TransitionEffect>
  )
}
