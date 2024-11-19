import React from 'react'
import { CodattaSigninContextProvider } from '../../lib/main'

export default function AppLayout(props: { children: React.ReactNode }) {
  return <CodattaSigninContextProvider>
    <div className='xc-h-screen xc-flex xc-items-center xc-justify-center'>
    {props.children}

    </div>
  </CodattaSigninContextProvider>
}