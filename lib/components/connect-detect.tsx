import { useEffect} from 'react'
import { useCodattaSigninContext } from '../codatta-signin-context-provider'
import { WalletItem } from '../types/wallet-item.class'

export default function ConnectDetect(props: {
  onInstalledWalletDetectFinish: (wallets: any[]) => void
  onFeaturedWalletDetectFinish: (wallets: any[]) => void
}) {
  const { installedWallets, featuredWallets } = useCodattaSigninContext()
  // const [connectedWallets, setConnectedWallets] = useState<any[]>([])

  async function detectConnect(wallets: WalletItem[]) {
    for (const wallet of wallets) {
      if (wallet.client) {
        const connected = await wallet.client.getAddresses()
        if (connected.length > 0) {
          wallet.updateState({ connected: true })
        }
      }
    }
    return wallets
  }

  useEffect(() => {
    detectConnect(installedWallets).then((wallets) => {
      props.onInstalledWalletDetectFinish(wallets)
    })
  }, [installedWallets])

  useEffect(() => {
    detectConnect(featuredWallets).then((wallets) => {
      props.onFeaturedWalletDetectFinish(wallets)
    })
  }, [featuredWallets])

  useEffect(() => {})

  return <></>
}
