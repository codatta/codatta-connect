import { useEffect, useState } from 'react'
import SigninIndex from './components/signin-index'
import AnimateContainer from './components/animate-container'
import { WalletItem } from './types/wallet-item.class'
import WalletConnectWidget from './components/wallet-connect-widget'

export default function CodattaConnect(props: {
  onSelectMoreWallets: () => void
  onSelectTonConnect?: () => void
  onConnect: (wallet: WalletItem) => Promise<void>
}) {
  const { onSelectMoreWallets, onSelectTonConnect, onConnect } = props
  const [step, setStep] = useState('')
  const [wallet, setWallet] = useState<WalletItem | null>(null)

  function handleSelectWallet(wallet: WalletItem) {
    setWallet(wallet)
    setStep('wallet')
  }

  function handleSelectEmail(email:string) {
    console.log('handleSelectEmail', email)
    setStep('email')
  }

  async function handleConnect(wallet: WalletItem) {
    await onConnect(wallet)
    setWallet(null)
    setStep('index')
  }

  useEffect(() => {
    setStep('index')
  }, [])

  return (
    <AnimateContainer className="bg-gray rounded-6 transition-height box-content w-full min-w-[277px] max-w-[420px] p-6">
      {step === 'wallet' && (
        <WalletConnectWidget
          onBack={() => setStep('index')}
          onConnect={handleConnect}
          wallet={wallet!}
        ></WalletConnectWidget>
      )}
      {step === 'index' && (
        <SigninIndex
          onEmailConfirm={handleSelectEmail}
          onSelectWallet={handleSelectWallet}
          onSelectMoreWallets={onSelectMoreWallets}
          onSelectTonConnect={onSelectTonConnect!}
          config={{
            title: 'Connect Wallet',
            showEmailSignIn: false,
            showFeaturedWallets: true,
            showInstalledWallets: true,
            showMoreWallets: true,
            showTonConnect: false,
          }}
        ></SigninIndex>
      )}
    </AnimateContainer>
  )
}
