import { useEffect, useState } from 'react'
import SigninIndex from './components/signin-index'
import EmailLoginWidget from './components/email-login'
import WalletLoginWidget from './components/wallet-login-widget'
import AnimateContainer from './components/animate-container'
import { WalletItem } from './types/wallet-item.class'

export function CodattaSignin(props: {
  onSelectMoreWallets: () => void
  onSelectTonConnect: () => void
  onLogin: (token: string, uid: string, new_user: boolean) => Promise<void>
  source: string
}) {
  const { onSelectMoreWallets, onSelectTonConnect, onLogin, source } = props
  const [step, setStep] = useState('')
  const [wallet, setWallet] = useState<WalletItem | null>(null)

  function handleSelectWallet(wallet: WalletItem) {
    setWallet(wallet)
    setStep('wallet')
  }

  function handleSelectEmail() {
    setStep('email')
  }

  async function hanleLoginSuccess(token: string, uid: string, new_user: boolean) {
    onLogin(token, uid, new_user)
  }

  useEffect(() => {
    setStep('index')
  }, [])

  return (
    <AnimateContainer className="xc-rounded-2xl xc-transition-height xc-box-content xc-w-full xc-min-w-[277px] xc-max-w-[420px] xc-p-6 xc-border ">
      {step === 'wallet' && (
        <WalletLoginWidget
          onBack={() => setStep('index')}
          onLogin={hanleLoginSuccess}
          wallet={wallet!}
          source={source}
        ></WalletLoginWidget>
      )}
      {step === 'email' && (
        <EmailLoginWidget onBack={() => setStep('index')} onLogin={hanleLoginSuccess} source={source} />
      )}
      {step === 'index' && (
        <SigninIndex
          onSelectEmail={handleSelectEmail}
          onSelectWallet={handleSelectWallet}
          onSelectMoreWallets={onSelectMoreWallets}
          onSelectTonConnect={onSelectTonConnect}
          config={{
            showEmailSignIn: true,
            showFeaturedWallets: true,
            showInstalledWallets: true,
            showMoreWallets: true,
            showTonConnect: true,
          }}
        ></SigninIndex>
      )}
    </AnimateContainer>
  )
}
