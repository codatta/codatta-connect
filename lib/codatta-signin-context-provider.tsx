import { createContext, useContext, useEffect, useState } from 'react'
import WalletDetect from './components/wallet-detect'
import { WalletBook } from './constant/wallet-book'
import { WalletInfo, WalletItem } from './types/wallet-item.class'
import LastUsedDetect, { LastUsedInfo } from './components/last-used-detect'

interface CodattaSigninContext {
  featuredWallets: WalletItem[]
  installedWallets: WalletItem[]
  lastUsedWallet: WalletItem | null
  saveLastUsedInfo: (info: LastUsedInfo, wallet?: WalletItem) => void
  getLastUsedInfo: () => LastUsedInfo | null
}

const codattaSigninContext = createContext<CodattaSigninContext>({
  lastUsedWallet: null,
  featuredWallets: [],
  installedWallets: [],
  saveLastUsedInfo: () => {},
  getLastUsedInfo: () => null,
})

export function useCodattaSigninContext() {
  return useContext(codattaSigninContext)
}

export function CodattaSigninContextProvider({ children }: any) {
  const [lastUsedWallet, setLastUsedWallet] = useState<WalletItem>()
  const [featuredWallets, setFeaturedWallets] = useState<WalletItem[]>([])
  const [installedWallets, setInstalledWallets] = useState<WalletItem[]>([])
  console.log('CodattaSigninContextProvider init!')

  function getLastUsedInfo() {
    try {
      const lastUsed = localStorage.getItem('codatta-connect-last-used')
      if (lastUsed) return JSON.parse(lastUsed) as LastUsedInfo
    } catch (err: any) {
      console.log(err)
    }
    return null
  }

  const saveLastUsedInfo = (info: LastUsedInfo, wallet?: WalletItem) => {
    localStorage.setItem('codatta-connect-last-used', JSON.stringify(info))
    wallet && setLastUsedWallet(wallet)
  }

  async function handleWalletDetected(wallets: any[]) {
    const lastUsedInfo = getLastUsedInfo()

    const featuredWallets = WalletBook.map((item) => {
      const walletInfo: WalletInfo = {
        key: item.key,
        name: item.name,
        image: item.image,
        rdns: item.rdns,
      }

      const detected = wallets.find((wallet) => wallet.info?.rdns === item.rdns)
      const lastUsed = item.name === lastUsedInfo?.walletName
      const provider = detected ? detected.provider : null
      const wallet = new WalletItem(walletInfo, item)
      wallet.updateState({ detected: !!detected, lastUsed })
      wallet.setProvider(provider)
      return wallet
    })

    const existRdns = new Set()
    const extraInstalledWallets = wallets.filter((wallet) => {
      console.log(wallet, featuredWallets)

      const extraInstalled = !featuredWallets.find((item) => item.info.rdns === wallet.info?.rdns)
      if (existRdns.has(wallet.info?.rdns)) {
        return false
      } else {
        existRdns.add(wallet.info?.rdns)
        return extraInstalled
      }
    })

    const extraWallets = extraInstalledWallets.map((item) => {
      const lastUsed = item.info.name === lastUsedInfo?.walletName
      const walletInfo: WalletInfo = {
        key: item.info.key,
        name: item.info.name,
        image: item.info.icon,
        rdns: item.info.rdns,
      }
      const wallet = new WalletItem(walletInfo, item)
      wallet.updateState({ detected: true, lastUsed })
      wallet.setProvider(item.provider)
      return wallet
    })

    setInstalledWallets(extraWallets)
    setFeaturedWallets(featuredWallets)
  }

  useEffect(() => {
    console.log(featuredWallets, installedWallets)
  }, [featuredWallets, installedWallets])

  function handleLastUsedWallet(wallet: WalletItem) {
    console.log(wallet, 'handleLastUsedWallet')
    setLastUsedWallet(wallet)
  }

  return (
    <codattaSigninContext.Provider
      value={{
        lastUsedWallet : lastUsedWallet || null,
        installedWallets,
        featuredWallets,
        saveLastUsedInfo,
        getLastUsedInfo,
      }}
    >
      <WalletDetect onFinish={handleWalletDetected}></WalletDetect>
      <LastUsedDetect onFinish={handleLastUsedWallet}></LastUsedDetect>
      {children}
    </codattaSigninContext.Provider>
  )
}
