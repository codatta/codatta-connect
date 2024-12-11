import { TDeviceType } from '@/api/account.api'
import { createContext, useContext, useEffect, useState } from 'react'

export interface CodattaSigninConfig {
  channel: string,
  device: TDeviceType
  app: string,
  inviterCode: string,
  relateInfo?: object
}

const CodattaSigninContext = createContext<CodattaSigninConfig>({
  channel: '',
  device: 'WEB',
  app: '',
  inviterCode: '',
  relateInfo: {} as object
})

export function useCodattaSigninContext() {
  return useContext(CodattaSigninContext)
}

interface CodattaConnectContextProviderProps {
  children: React.ReactNode
  config: CodattaSigninConfig
}

export function CodattaSinginContextProvider(props: CodattaConnectContextProviderProps) {
  const { config } = props
  const [channel, setChannel] = useState(config.channel)
  const [device, setDevice] = useState<TDeviceType>(config.device)
  const [app, setApp] = useState(config.app)
  const [inviterCode, setInviderCode] = useState(config.inviterCode)
  const [relateInfo, setRelateInfo] = useState<object | undefined>(config.relateInfo)

  useEffect(() => {
    setChannel(config.channel)
    setDevice(config.device)
    setApp(config.app)
    setInviderCode(config.inviterCode)
    setRelateInfo(config.relateInfo)
  }, [config])

  return (
    <CodattaSigninContext.Provider
      value={{
        channel,
        device,
        app,
        inviterCode,
        relateInfo,
      }}
    >
      {props.children}
    </CodattaSigninContext.Provider>
  )
}
