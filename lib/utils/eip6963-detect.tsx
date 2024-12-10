import { EIP1193Provider } from "viem"

interface EIP6963ProviderInfo {
  uuid: string
  name: string
  icon: string
  rdns: string
}

export interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo
  provider: EIP1193Provider
}

export function EIP6963Detect(): Promise<EIP6963ProviderDetail[]>  {
  return new Promise((resolve) => {
    const wallets: EIP6963ProviderDetail[] = []
    let timer: NodeJS.Timeout
    window.addEventListener('eip6963:announceProvider', (event: any) => {
      const { detail } = event as { detail: EIP6963ProviderDetail }
      if (timer) clearTimeout(timer)
      wallets.push(detail)
      timer = setTimeout(() => resolve(wallets), 200)
    })
    timer = setTimeout(() => resolve(wallets), 200)
    window.dispatchEvent(new Event('eip6963:requestProvider'))
  })
}