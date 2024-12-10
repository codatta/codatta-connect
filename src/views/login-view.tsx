import { ILoginResponse } from '../../lib/api/account.api'
import { CodattaSignin} from '../../lib/main'
import React from 'react'

export default function LoginView() {


  async function handleLogin(res:ILoginResponse) {
    console.log('this is out component')
    console.log(res)
  }

  return (
      <CodattaSignin onLogin={handleLogin}></CodattaSignin>
  )
}