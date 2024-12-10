import { EIP1193Provider, WalletClient, createWalletClient, custom } from 'viem'
import { WalletConfig } from '../constant/wallet-book'
import UniversalProvider from '@walletconnect/universal-provider'
import { EIP6963ProviderDetail } from '../utils/eip6963-detect'

export class WalletItem {

  private _key: string
  private _config: WalletConfig | null = null
  private _provider: EIP1193Provider | UniversalProvider | null = null
  private _connected: boolean = false
  private _address: `0x${string}` | null = null
  private _fatured: boolean = false
  private _installed: boolean = false
  public lastUsed: boolean = false

  public get connected() {
    return this._connected
  }

  public get featured() {
    return this._fatured
  }

  public get key() {
    return this._key
  }

  public get installed() {
    return this._installed
  }


  public get client(): WalletClient | null {
    if (!this._provider) return null
    return createWalletClient({ transport: custom(this._provider) })
  }

  public get config() {
    return this._config
  }

  static fromWalletConfig(config: WalletConfig) {
    return new WalletItem(config)
  }

  constructor(params: EIP6963ProviderDetail)
  constructor(params: WalletConfig)
  constructor(params: UniversalProvider)
  constructor(params: WalletConfig | EIP6963ProviderDetail | UniversalProvider) {
    if ('name' in params && 'image' in params) {
      // walletconfig
      this._key = params.name
      this._config = params
      this._fatured = params.featured
    } else if ('session' in params) {
      // universal provider
      if (!params.session) throw new Error('session is null')
      this._key = params.session?.peer.metadata.name
      this._provider = params
      this._config = {
        name: params.session.peer.metadata.name,
        image: params.session.peer.metadata.icons[0],
        featured: false,
      }
    } else if ('info' in params) {
      // eip6963
      console.log(params.info, 'installed')
      this._key = params.info.name
      this._provider = params.provider
      this._installed = true
      this._config = {
        name: params.info.name,
        image: params.info.icon,
        featured: false,
      }
      this.testConnect()
    } else {
      throw new Error('unknown params')
    }
  }

  public EIP6963Detected(detail: EIP6963ProviderDetail) {
    this._provider = detail.provider
    this._installed = true
    this._provider.on('disconnect', this.disconnect)
    this._provider.on('accountsChanged', (addresses: `0x${string}`[]) => {
      this._address = addresses[0]
      this._connected = true
    })
    this.testConnect()
  }

  public setUniversalProvider(provider: UniversalProvider) {
    this._provider = provider
    this.testConnect()
  }

  private async testConnect() {
    const address = await this.client?.getAddresses()
    if (address && address.length > 0) {
      this._address = address[0]
      this._connected = true
    } else {
      this._address = null
      this._connected = false
    }
  }

  async connect() {
    const addresses = await this.client?.request({ method: 'eth_requestAccounts', params: undefined })
    if (!addresses) throw new Error('connect failed')
    return addresses
  }

  async getAddress() {
    const addresses = await this.client?.getAddresses()
    if (!addresses || !addresses.length) throw new Error('get address failed')
    return addresses[0]
  }

  async getChain() {
    const chain = await this.client?.getChainId()
    console.log('wallet client', this.client)
    if (!chain) throw new Error('get chain failed')
    return chain
  }

  async signMessage(message: string) {
    if (!this._address || !this._connected) return
    const signature = await this.client?.signMessage({ message, account: this._address })
    return signature
  }

  async disconnect() {
    if (this._provider && 'session' in this._provider) {
      await this._provider.disconnect()
    } 
    this._connected = false
    this._address = null
  }
}
