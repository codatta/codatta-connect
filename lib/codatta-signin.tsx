import { useEffect, useState } from 'react'
import SigninIndex from './components/signin-index'
import EmailLoginWidget from './components/email-login'
import EvmWalletLoginWidget from './components/evm-wallet-login-widget'
import TonWalletLoginWidget from './components/ton-wallet-login-widget'
import AnimateContainer from './components/animate-container'
import { WalletItem } from './types/wallet-item.class'
import WalletList from './components/wallet-list'
import { ILoginResponse } from './api/account.api'

type TStep = 'index' | 'email' | 'evm-wallet' | 'all-wallet' | 'ton-wallet' | ''



export function CodattaSignin(props: {
  onLogin: (res: ILoginResponse) => Promise<void>
}) {
  const { onLogin } = props
  const [step, setStep] = useState<TStep>('')
  const [wallet, setWallet] = useState<WalletItem | null>(null)
  const [email, setEmail] = useState<string>('')

  function handleSelectWallet(wallet: WalletItem) {
    setWallet(wallet)
    setStep('evm-wallet')
  }

  function handleSelectEmail(email:string) {
    setStep('email')
    setEmail(email)
  }

  async function hanleLoginSuccess(res:ILoginResponse) {
    await onLogin(res)
  }

  function onSelectTonConnect() {
    setStep('ton-wallet')
  }

  useEffect(() => {
    setStep('index')
  }, [])

  return (
    <AnimateContainer className="xc-rounded-2xl xc-transition-height xc-box-content xc-w-full xc-min-w-[277px] xc-max-w-[420px] xc-p-6 xc-border ">
      {step === 'evm-wallet' && (
        <EvmWalletLoginWidget
          onBack={() => setStep('index')}
          onLogin={hanleLoginSuccess}
          wallet={wallet!}
        ></EvmWalletLoginWidget>
      )}
      {step === 'ton-wallet' && (
        <TonWalletLoginWidget
          onBack={() => setStep('index')}
          onLogin={hanleLoginSuccess}
        ></TonWalletLoginWidget>
      )}
      {step === 'email' && (
        <EmailLoginWidget email={email} onBack={() => setStep('index')} onLogin={hanleLoginSuccess} />
      )}
      {step === 'index' && (
        <SigninIndex
          onEmailConfirm={handleSelectEmail}
          onSelectWallet={handleSelectWallet}
          onSelectMoreWallets={()=>{setStep('all-wallet')}}
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
      {step === 'all-wallet' && (<WalletList onBack={() => setStep('index')}
        onSelectWallet={handleSelectWallet}
      ></WalletList>
      )}
    </AnimateContainer>
  )
}
