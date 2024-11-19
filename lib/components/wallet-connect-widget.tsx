import { useState } from 'react'
import ControlHead from './control-head'
import TransitionEffect from './transition-effect'
import WalletQr from './wallet-qr'
import WalletConnect from './wallet-connect'
import GetWallet from './get-wallet'
import { WalletItem } from '../types/wallet-item.class'
import { useCodattaSigninContext } from '../codatta-signin-context-provider'

export default function WalletConnectWidget(props: {
  wallet: WalletItem
  onConnect: (wallet: WalletItem) => void
  onBack: () => void
}) {
  const context = useCodattaSigninContext()
  const { wallet, onConnect } = props
  console.log('WalletConnectWidget', context)
  const [step, setStep] = useState(wallet?.state?.detected ? 'connect' : 'qr')

  async function handleSignFinish() {
    console.log('handleSignFinish', context)
    onConnect(wallet)
  }

  return (
    <TransitionEffect>
      <div className="mb-6">
        <ControlHead title={'Log in to codatta'} onBack={props.onBack} />
      </div>
      {step === 'qr' && (
        <WalletQr
          wallet={wallet}
          onGetExtension={() => setStep('get-extension')}
          onSignFinish={handleSignFinish}
        ></WalletQr>
      )}
      {step === 'connect' && (
        <WalletConnect
          onShowQrCode={() => setStep('qr')}
          wallet={wallet}
          onSignFinish={handleSignFinish}
        ></WalletConnect>
      )}
      {step === 'get-extension' && <GetWallet wallet={wallet}></GetWallet>}
    </TransitionEffect>
  )
}
