import { useEffect } from 'react'

export default function WalletDelete(props: { onFinish?: (wallets: any) => void }) {
  function WalletDelete() {
    return new Promise((resolve) => {
      const wallets:any[] = []
      let timer: NodeJS.Timeout
      window.addEventListener('eip6963:announceProvider', (event: any) => {
        if (timer) clearTimeout(timer)
        wallets.push(event.detail)
        timer = setTimeout(() => resolve(wallets), 200)
      })
      timer = setTimeout(() => resolve(wallets), 200)
      window.dispatchEvent(new Event('eip6963:requestProvider'))
    })
  }

  async function init() {
    const wallets = await WalletDelete()
    props.onFinish?.(wallets || [])
  }

  useEffect(() => {
    init()
  }, [])

  return <></>
}
