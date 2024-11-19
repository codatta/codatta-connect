import { useEffect, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'
import { UniversalProvider } from '@walletconnect/universal-provider'
import { mainnet } from 'viem/chains'
import { createWalletClient, custom } from 'viem'
import { Link2, Download, Loader2, CheckCircle } from 'lucide-react'
import { createSiweMessage } from 'viem/siwe'
import { WalletItem } from '../types/wallet-item.class'
import { useCodattaSigninContext } from '../codatta-signin-context-provider'
import accountApi from '../api/account.api'

const walletConnectConfig = {
  projectId: '7a4434fefbcc9af474fb5c995e47d286',
  metadata: {
    name: 'codatta',
    description: 'codatta',
    url: 'https://codatta.io/',
    icons: ['https://avatars.githubusercontent.com/u/171659315'],
  },
}

const walletProviderConnectConfig = {
  namespaces: {
    eip155: {
      methods: [
        'eth_sendTransaction',
        'eth_signTransaction',
        'eth_sign',
        'personal_sign',
        'eth_signTypedData',
        'wallet_addEthereumChain',
        'wallet_switchEthereumChain',
      ],
      chains: ['eip155:1'],
      events: ['chainChanged', 'accountsChanged', 'disconnect'],
      rpcMap: {
        1: `https://rpc.walletconnect.com?chainId=eip155:1&projectId=${'7a4434fefbcc9af474fb5c995e47d286'}`,
      },
    },
  },
  skipPairing: false,
}

// function isAndroid() {
//   return /Android/i.test(navigator.userAgent)
// }

// function isIOS() {
//   return /iPhone|iPad|iPod/i.test(navigator.userAgent)
// }

function getSiweMessage(address: `0x${string}`, nonce: string) {
  const domain = window.location.host
  const uri = window.location.href
  const message = createSiweMessage({
    address: address,
    chainId: 1,
    domain,
    nonce,
    uri,
    version: '1',
  })
  return message
}
export default function WalletQr(props: {
  wallet: WalletItem
  onGetExtension: () => void
  onSignFinish: (params: {
    message: string
    nonce: string
    signature: string
    address: string
    wallet_name: string
    topic_id?: string
  }) => Promise<void>
}) {
  const qrCodeContainer = useRef<HTMLDivElement>(null)
  const { wallet, onGetExtension, onSignFinish } = props
  const [wcUri, setWcUri] = useState('')
  const [uriLoading, setUriLoading] = useState(false)
  const [error, setError] = useState('')
  const [guideType, setGuideType] = useState<'scan' | 'connect' | 'sign' | 'waiting'>('scan')
  const qrCode = useRef<QRCodeStyling>()
  const [image, setImage] = useState(wallet.info.image)
  const [copied, setCopied] = useState(false)

  const { saveLastUsedInfo } = useCodattaSigninContext()

  async function getWcUri(wallet: WalletItem) {
    setUriLoading(true)
    const provider = await UniversalProvider.init(walletConnectConfig)
    try {
      setGuideType('scan')
      provider.on('display_uri', (uri:string) => {
        setWcUri(uri)
        setUriLoading(false)
        setGuideType('scan')
      })
      provider.on('error', (err:any) => {
        console.log(err)
      })
      const client = createWalletClient({ chain: mainnet, transport: custom(provider) })
      const session = await provider.connect(walletProviderConnectConfig)
      if (!session) throw new Error('Walletconnect init failed')
      const peerName = session.peer?.metadata?.name || wallet.info.name
      const peerIcon = session.peer?.metadata?.icons[0] || wallet.info.image
      setImage(peerIcon)
      const address = await client.getAddresses()
      const nonce = await accountApi.getNonce()
      const message = getSiweMessage(address[0], nonce)
      setGuideType('sign')
      const signature = await client.signMessage({ message, account: address[0] })
      setGuideType('waiting')
      console.log('session', session)
      wallet.setProvider(provider)
      await onSignFinish({
        address: address[0],
        signature,
        message,
        nonce,
        wallet_name: peerName,
        topic_id: session.pairingTopic,
      })
      saveLastUsedInfo(
        {
          connector: 'codatta-connect',
          method: 'wallet-connect',
          walletName: peerName,
          pairingTopic: session.pairingTopic,
          topicId: session.topic,
        },
        wallet,
      )
    } catch (err: any) {
      setError(err.details || err.message)
      provider.disconnect()
    }
  }

  function initQrCode() {
    qrCode.current = new QRCodeStyling({
      width: 264,
      height: 264,
      margin: 0,
      type: 'svg',
      image: wallet.info.image,
      qrOptions: {
        errorCorrectionLevel: 'M',
      },
      dotsOptions: {
        color: 'black',
        type: 'rounded',
      },
      backgroundOptions: {
        color: 'transparent',
      },
    })

    qrCode.current.append(qrCodeContainer.current!)
  }

  function updateQrCode(content: string) {
    console.log(qrCode.current)
    qrCode.current?.update({
      data: content,
    })
  }

  useEffect(() => {
    if (wcUri) updateQrCode(wcUri)
  }, [wcUri])

  useEffect(() => {
    getWcUri(wallet)
  }, [wallet])

  useEffect(() => {
    initQrCode()
  }, [])

  function handleRetry() {
    setError('')
    updateQrCode('')
    getWcUri(wallet)
  }

  function handleCopyQrUri() {
    setCopied(true)
    navigator.clipboard.writeText(wcUri)
    setTimeout(() => {
      setCopied(false)
    }, 2500)
  }

  return (
    <div>
      <div className="xc-text-center">
        <div className="xc-relative xc-mx-auto xc-mb-6 xc-block xc-max-h-[272px] xc-max-w-[272px] xc-rounded-xl xc-bg-white xc-p-1">
          <div className="xc-aspect-[1/1] xc-flex xc-h-full xc-w-full xc-justify-center" ref={qrCodeContainer}></div>
          <div className="xc-absolute xc-left-0 xc-top-0 xc-flex xc-h-full xc-w-full xc-items-center xc-justify-center">
            {uriLoading ? (
              <Loader2 className="xc-h-6 xc-w-6 xc-animate-spin xc-text-black" size={20}></Loader2>
            ) : (
              <img className="xc-h-10 xc-w-10" src={image}></img>
            )}
          </div>
        </div>
      </div>
      <div className="xc-m-auto xc-mb-6 xc-flex xc-max-w-[400px] xc-flex-wrap xc-items-center xc-justify-between xc-gap-3">
        <button
          disabled={!wcUri}
          onClick={handleCopyQrUri}
          className="xc-disabled:hover-text-white xc-flex xc-min-w-[160px] xc-flex-1 xc-shrink-0 xc-items-center xc-justify-center xc-gap-2 xc-rounded-full xc-border xc-py-2 xc-text-sm xc-transition-all xc-hover:bg-white xc-hover:text-black xc-disabled:cursor-not-allowed xc-disabled:opacity-40 xc-disabled:hover:bg-transparent"
        >
          {copied ? (
            <>
              {' '}
              <CheckCircle /> Copied!
            </>
          ) : (
            <>
              <Link2></Link2>Copy QR URL
            </>
          )}
        </button>
        <button
          className="xc-rounded-2 xc-flex xc-min-w-[160px] xc-flex-1 xc-shrink-0 xc-items-center xc-justify-center xc-gap-2 xc-rounded-full xc-border xc-py-2 xc-text-sm xc-transition-all xc-hover:bg-white xc-hover:text-black"
          onClick={onGetExtension}
        >
          <Download></Download>Get Extension
        </button>
      </div>
      <div className="xc-text-center">
        {error ? (
          <div className="xc-flex xc-flex-col xc-items-center">
            <p className="xc-text-danger xc-mb-2 xc-text-center">{error}</p>
            <button className="xc-rounded-full xc-bg-gray-100 xc-px-6 xc-py-1" onClick={handleRetry}>
              Retry
            </button>
          </div>
        ) : (
          <>
            {guideType === 'scan' && <p>Scan this QR code from your mobile wallet or phone's camera to connect.</p>}
            {guideType === 'connect' && <p>Click connect in your wallet app</p>}
            {guideType === 'sign' && <p>Click sign-in in your wallet to confirm you own this wallet.</p>}
            {guideType === 'waiting' && (
              <div className="xc-text-center">
                <Loader2 className="xc-inline-block xc-animate-spin"></Loader2>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}