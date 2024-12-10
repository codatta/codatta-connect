import React from 'react'
import { CodattaConnectContextProvider } from '../../lib/main'

export default function AppLayout(props: { children: React.ReactNode }) {
  return <CodattaConnectContextProvider config={{apiBaseUrl:'https://app-test.b18a.io',
    device: 'WEB',
    channel: 'Wmarkof',
    inviderCode: 'amrioki',
    app: 'codatta-test'
  }}>
    <div className='xc-h-screen xc-flex xc-items-center xc-justify-center'>
      {props.children}
    </div>
  </CodattaConnectContextProvider>
}