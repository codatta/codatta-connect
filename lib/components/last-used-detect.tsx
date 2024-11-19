import { useEffect} from 'react'
import { WalletItem } from '../types/wallet-item.class'
import { useCodattaSigninContext } from '../codatta-signin-context-provider'
// import UniversalProvider from '@walletconnect/universal-provider'
// import { createWalletClient, custom } from 'viem'
// import { mainnet } from 'viem/chains'

export interface LastUsedInfo {
  connector: 'codatta-connect' | 'ton-connect' | 'dynamic-connect'
  method?: 'wallet-connect' | 'injected' | 'email'
  walletName?: string
  [key: string]: any
}

// const walletConnectConfig = {
//   projectId: '9883bdec198de9fa2bb685b1d6c522c8',
//   metadata: {
//     name: 'codatta',
//     description: 'codatta',
//     url: 'https://codatta.io/',
//     icons: ['https://avatars.githubusercontent.com/u/37784886'],
//   },
// }

// const getWalletProviderConnectConfig = (topic: string, pairingTopic: string) => {
//   return {
//     namespaces: {
//       eip155: {
//         methods: ['eth_sendTransaction', 'eth_signTransaction', 'eth_sign', 'personal_sign', 'eth_signTypedData'],
//         chains: ['eip155:1'],
//         events: ['chainChanged', 'accountsChanged'],
//         rpcMap: {
//           1: `https://rpc.walletconnect.com?chainId=eip155:1&projectId=${'9883bdec198de9fa2bb685b1d6c522c8'}`,
//         },
//       },
//     },
//     topic: topic,
//     pairingTopic: pairingTopic,
//     skipPairing: false,
//   }
// }

export default function LastUsedDetect(props: { onFinish?: (wallet: WalletItem) => void }) {
  const { installedWallets, featuredWallets, getLastUsedInfo } = useCodattaSigninContext()
  // const recovering = useRef(false)

  // async function recoverWalletConnect(lastUsed: LastUsedInfo): Promise<WalletItem | null> {
  //   const provider = await UniversalProvider.init(walletConnectConfig)
  //   if (recovering.current) return
  //   recovering.current = true
  //   try {
  //     console.log('recoverWalletConnect', lastUsed)
  //     const client = createWalletClient({ chain: mainnet, transport: custom(provider) })
  //     console.log('recoverWalletConnect-client', client)
  //     const connectConfig = getWalletProviderConnectConfig(lastUsed.topicId, lastUsed.pairingTopic)
  //     console.log('recoverWalletConnect-connectConfig', connectConfig)
  //     const session = await provider.connect(connectConfig)
  //     console.log('recoverWalletConnect-session', session)
  //     const address = await client.getAddresses()
  //     const walletInfo: WalletInfo = {
  //       name: session.peer?.metadata?.name,
  //       image: session.peer?.metadata?.icons[0],
  //       key: `wallet-connect-${lastUsed.topicId}`,
  //     }
  //     const wallet = new WalletItem(walletInfo, null)
  //     wallet.setProvider(provider)
  //     wallet.updateState({ lastUsed: true, connected: true, address: address[0] })
  //     return wallet
  //   } catch (err: any) {
  //     console.log(err)
  //     provider.disconnect()
  //   }
  //   recovering.current = false
  //   return null
  // }

  function recoverInjected(walletName: string) {
    let lastUsedWallet: WalletItem | null = null

    ;[installedWallets, featuredWallets].map((wallets) => {
      console.log(wallets, walletName)
      const wallet = wallets.find((wallet) => wallet.info.name === walletName)
      console.log('find', wallet)
      if (wallet) {
        wallet.updateState({ lastUsed: true })
        lastUsedWallet = wallet
      }
    })
    console.log('recoverInjected', installedWallets, featuredWallets)
    return lastUsedWallet
  }

  async function init() {
    const lastUsed = getLastUsedInfo()
    if (!lastUsed) return

    let lastUsedWallet: WalletItem | null = null
    // if (lastUsed.connector === 'codatta-connect' && lastUsed.method === 'wallet-connect') {
    //   lastUsedWallet = await recoverWalletConnect(lastUsed.topicId)
    //   if (lastUsedWallet) props.onFinish?.(lastUsedWallet)
    // }
    if (lastUsed.connector === 'codatta-connect' && lastUsed.method === 'injected') {
      lastUsedWallet = recoverInjected(lastUsed.walletName!)
      if (lastUsedWallet) props.onFinish?.(lastUsedWallet)
    }
  }

  useEffect(() => {
    init()
  }, [installedWallets, featuredWallets])

  return <></>
}
