import { WalletClient, createWalletClient, custom } from 'viem'
import { WalletConfig } from '../constant/wallet-book'
import { mainnet } from 'viem/chains'

export interface WalletInfo {
  key: string
  name: string
  image: string
  rdns?: string
}

export interface WalletState {
  connected: boolean
  address: `0x${string}` | null
  chainId: number
  detected: boolean
  lastUsed: boolean
}

export class WalletItem {
  // 钱包信息，这些信息是固定的，不会被反复使用和更新。
  info: WalletInfo

  // 钱包配置，这些配置信息是固定的，不会被反复使用和更新。
  config?: WalletConfig | null = null

  // 钱包客户端，这个客户端是用来与钱包进行交互的。
  client: WalletClient | null = null

  provider: any

  // 状态信息，这些信息可能会被反复使用和更新。
  state: WalletState = {
    connected: false,
    address: null,
    chainId: 0,
    detected: false,
    lastUsed: false,
  }

  // private stateStore: WalletState = proxy<WalletState>({
  //   connected: false,
  //   address: null,
  //   chainId: 0,
  //   detected: false,
  //   lastUsed: false,
  // })

  constructor(info: WalletInfo, config: WalletConfig) {
    this.info = info
    this.config = config
  }

  private async testConnect() {
    const address = await this.client?.getAddresses()
    if (address && address.length > 0) {
      this.state.address = address[0]
      this.state.connected = true
    } else {
      this.state.connected = false
    }
  }

  async connect() {
    const addresses = await this.client?.request({ method: 'eth_requestAccounts', params: undefined })
    if (!addresses) throw new Error('connect failed')
    this.state.address = addresses[0]
    this.state.connected = true
    return addresses
  }

  async signMessage(message: string) {
    if (!this.state.address) return
    const signature = await this.client?.signMessage({ message, account: this.state.address })
    return signature
  }

  async switchChain(chainId: number) {
    await this.client?.switchChain({ id: chainId })
    this.state.chainId = chainId
  }

  async disconnect() {
    this.state.connected = false
  }

  private handleDisconnect() {
    console.log('disconnect', this.state)
    this.state.connected = false
  }

  async setProvider(provider: any) {
    this.provider = provider
    this.client = createWalletClient({
      chain: mainnet,
      transport: custom(provider),
    })
    this.testConnect()
    this.provider.on('disconnect', this.handleDisconnect.bind(this))
  }

  async updateState(state: Partial<WalletState>) {
    this.state = { ...this.state, ...state }
  }
}
