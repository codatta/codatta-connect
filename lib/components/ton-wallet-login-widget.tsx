import { useEffect, useState } from 'react'
import TransitionEffect from './transition-effect'
import accountApi, { ILoginResponse } from '../api/account.api'
import TonWalletSelect from './ton-wallet-select'
import TonConnect, { Wallet, WalletInfo, WalletInfoInjectable, WalletInfoRemote } from '@tonconnect/sdk'
import TonWalletConnect from './ton-wallet-connect'
import { useCodattaSigninContext } from '@/providers/codatta-signin-context-provider'

type TStep = 'select' | 'connect' | 'get-extension' | ''

export default function TonWalletLoginWidget(props: {
  onLogin: (res: ILoginResponse) => void
  onBack: () => void
}) {
  const [step, setStep] = useState<TStep>('')
  const [wallet, setWallet] = useState<WalletInfoRemote | WalletInfoInjectable>()
  const [connector, setConnector] = useState<TonConnect>()
  const config = useCodattaSigninContext()
  const [loading, setLoading] = useState(false)

  async function handleStatusChange(status: Wallet | null) {
    if (!status) return
    if (!status.connectItems?.tonProof) return
    setLoading(true)
    const res = await accountApi.tonLogin({
      account_type: 'block_chain',
      connector: 'codatta_ton',
      account_enum: 'C',
      wallet_name: status?.device.appName,
      inviter_code: config.inviterCode,
      address: status.account.address,
      chain: status.account.chain,
      connect_info: [
        {name: 'ton_addr', network: status.account.chain, ...status.account},
        status.connectItems?.tonProof
      ],
      source: {
        device: config.device,
        channel: config.channel,
        app: config.app
      },
      related_info: config.relateInfo

    })
    await props.onLogin(res.data)
    setLoading(false)
  }

  useEffect(()=>{
    const connector = new TonConnect({
      manifestUrl: 'https://static.codatta.io/static/tonconnect-manifest.json?v=2'
    })

    const unsubscribe = connector.onStatusChange(handleStatusChange)
    setConnector(connector)
    setStep('select')
    return unsubscribe
  }, [])

  function handleSelectWallet(wallet: WalletInfo) {
    setStep('connect')
    setWallet(wallet)
  }

  return (
    <TransitionEffect>
      {step === 'select' && (
        <TonWalletSelect
          connector={connector!}
          onSelect={handleSelectWallet}
          onBack={props.onBack}
        ></TonWalletSelect>
      )}
      {step === 'connect' && (
         <TonWalletConnect
           connector={connector!}
           wallet={wallet!}
           onBack={props.onBack}
           loading={loading}
         ></TonWalletConnect>
       )}
    </TransitionEffect>
  )
}
