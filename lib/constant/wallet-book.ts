export type ChainType = 'evm' | 'sol' | 'ton' | 'btc'
const walletIconsImage = 'https://s.xny.ai/xny-connect/wallet-icons.svg'

export interface WalletConfig {
  name: string
  image: string
  featured: boolean

  // for wallet detect
  rdns?: string

  // for get wallet
  getWallet?: {
    chrome_store_id?: string
    edge_addon_id?: string
    brave_store_id?: string
    firefox_addon_id?: string
    play_store_id?: string
    app_store_id?: string
    mac_app_store_id?: string
  },

  // for call app
  deep_link?: string
  webapp_link?: string
  universal_link?: string
  desktop_link?: string,
  tma_link?: string,

  // for call wallet
  injected?: {
    [key in ChainType]: string
  }
}

export const WalletBook: WalletConfig[] = [
  {
    featured: true,

    name: 'MetaMask',
    rdns: 'io.metamask',
    image: `${walletIconsImage}#metamask`,

    getWallet: {
      chrome_store_id: 'nkbihfbeogaeaoehlefnkodbefgpgknn',
      brave_store_id: 'nkbihfbeogaeaoehlefnkodbefgpgknn',
      edge_addon_id: 'ejbalbakoplchlghecdalmeeeajnimhm',
      firefox_addon_id: 'ether-metamask',
      play_store_id: 'io.metamask',
      app_store_id: 'id1438144202',
    },

    deep_link: 'metamask://wc',
    universal_link: 'https://metamask.app.link/wc',
  },
  {
    featured: true,

    name: 'OKX Wallet',
    rdns: 'com.okex.wallet',
    image: `${walletIconsImage}#okx`,

    getWallet:{
      chrome_store_id: 'mcohilncbfahbmgdjkbpemcciiolgcge',
      brave_store_id: 'mcohilncbfahbmgdjkbpemcciiolgcge',
      edge_addon_id: 'pbpjkcldjiffchgbbndmhojiacbgflha',
      play_store_id: 'com.okinc.okex.gp',
      app_store_id: 'id1327268470',
    },

    deep_link: 'okex://main/wc',
    universal_link: 'okex://main/wc',

  },
  {
    featured: true,
    name: "WalletConnect",
    image: `${walletIconsImage}#walletconnect`,
  },
  {
    featured: false,
    name: "Coinbase Wallet",
    image: `${walletIconsImage}#coinbase`,
  },
  {
    featured: true,
    name: 'GateWallet',
    rdns: 'io.gate.wallet',
    image: `${walletIconsImage}#6e528abf-7a7d-47bd-d84d-481f169b1200`,

    getWallet:{
      chrome_store_id: 'cpmkedoipcpimgecpmgpldfpohjplkpp',
      brave_store_id: 'cpmkedoipcpimgecpmgpldfpohjplkpp',
      play_store_id: 'com.gateio.gateio',
      app_store_id: 'id1294998195',
      mac_app_store_id: 'id1609559473',
    },

    deep_link: 'https://www.gate.io/mobileapp',
    universal_link: 'https://www.gate.io/mobileapp',
    desktop_link: 'gtweb3wallet://wc'
  },
  {
    featured: false,
    name: "Onekey",
    rdns: "so.onekey.app.wallet",
    image: `${walletIconsImage}#onekey`,

    getWallet: {

      chrome_store_id: "kfndfpljldjblhckmbbhbhbchjhhgghd",
      brave_store_id: "kfndfpljldjblhckmbbhbhbchjhhgghd",
      play_store_id: "com.onekey.wallet",
      app_store_id: "id1609559473",
    },

    deep_link: "onekey-wallet://",
    universal_link: "onekey://wc",
    desktop_link: "onekey-wallet://",
    webapp_link: "https://app.onekey.so/wc/connect"
  }
]