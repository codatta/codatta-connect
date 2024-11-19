export type ChainType = 'evm' | 'sol' | 'ton' | 'btc'
const walletIconsImage = 'https://s.xny.ai/xny-connect/wallet-icons.svg'

export interface WalletConfig {
  key: string
  name: string
  rdns?: string
  image: string
  injected?: {
    chain: ChainType
    location: string
  }[]
  chrome_store_id?: string
  edge_addon_id?: string
  brave_store_id?: string
  firefox_addon_id?: string
  play_store_id?: string
  app_store_id?: string
  deeplink?: string
  universal_link?: string
  desktop_link?: string
}

export const WalletBook: WalletConfig[] = [
  {
    key: 'MetaMask',
    name: 'MetaMask',
    rdns: 'io.metamask',
    image: `${walletIconsImage}#metamask`,
    chrome_store_id: 'nkbihfbeogaeaoehlefnkodbefgpgknn',
    brave_store_id: 'nkbihfbeogaeaoehlefnkodbefgpgknn',
    edge_addon_id: 'ejbalbakoplchlghecdalmeeeajnimhm',
    firefox_addon_id: 'ether-metamask',
    play_store_id: 'io.metamask',
    app_store_id: 'id1438144202',
    deeplink: 'metamask://wc',
    universal_link: 'https://metamask.app.link/wc',
  },
  {
    key: 'OKX',
    name: 'OKX Wallet',
    rdns: 'com.okex.wallet',
    image: `${walletIconsImage}#okx`,
    chrome_store_id: 'mcohilncbfahbmgdjkbpemcciiolgcge',
    brave_store_id: 'mcohilncbfahbmgdjkbpemcciiolgcge',
    edge_addon_id: 'pbpjkcldjiffchgbbndmhojiacbgflha',
    play_store_id: 'com.okinc.okex.gp',
    app_store_id: 'id1327268470',
    deeplink: 'okex://main/wc',
    universal_link: 'okex://main/wc',
  },
  {
    key: 'GateWallet',
    name: 'GateWallet',
    rdns: 'io.gate.wallet',
    image: `${walletIconsImage}#6e528abf-7a7d-47bd-d84d-481f169b1200`,
    chrome_store_id: 'cpmkedoipcpimgecpmgpldfpohjplkpp',
    brave_store_id: 'cpmkedoipcpimgecpmgpldfpohjplkpp',
    play_store_id: 'com.gateio.gateio',
    app_store_id: 'id1294998195',
    deeplink: 'https://www.gate.io/mobileapp',
    universal_link: 'https://www.gate.io/mobileapp',
    desktop_link: 'gtweb3wallet://wc',
  },
]
