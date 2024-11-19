import { useState } from 'react'
import ControlHead from './control-head'
import TransitionEffect from './transition-effect'
import WalletQr from './wallet-qr'
import WalletConnect from './wallet-connect'
import GetWallet from './get-wallet'
// import accountApi from '@/api/account.api'
import { WalletItem } from '../types/wallet-item.class'

export default function WalletLogin(props: {
  wallet: WalletItem
  onLogin: (token: string, uid: string, new_user: boolean) => void
  onBack: () => void
  source: string
}) {
  const { wallet } = props
  const [step, setStep] = useState(wallet?.state?.detected ? 'connect' : 'qr')

  async function handleSignFinish(params: {
    message: string
    nonce: string
    signature: string
    address: string
    wallet_name: string
  }) {
    console.log('handleSignFinish', params)
    // const res = await accountApi.walletLogin(null, null, params, source)
    // await onLogin(res.token, res.user_info?.user_id, !!res.user_info?.new_user)
  }

  return (
    <TransitionEffect>
      <div className="xc-mb-6">
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
