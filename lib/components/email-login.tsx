import ControlHead from './control-head'
import TransitionEffect from './transition-effect'
import { useEffect, useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp'
import accountApi, { ILoginResponse } from '@/api/account.api'
import { Mail } from 'lucide-react'
import Spin from './ui/spin'
import { useCodattaConnectContext } from '@/codatta-signin-context-provider'

export default function EmailLoginWidget(props: {
  email: string
  onLogin: (res: ILoginResponse) => void
  onBack: () => void
}) {
  const { email } = props
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const {config} = useCodattaConnectContext()

  async function startCountDown() {
    setCount(10)
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  async function sendEmailCode(email: string) {
    setLoading(true)
    try {
      await accountApi.getEmailCode({ account_type: 'email', email })
      startCountDown()
    } catch (err: any) {
      setError(err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!email) return
    sendEmailCode(email)
  }, [email])

  async function handleOTPChange(value: string) {
    setError('')
    if (value.length < 6) return
    setLoading(true)
    try {
      const res = await accountApi.emailLogin({
        account_type: 'email',
        connector: 'codatta_email',
        account_enum: 'C',
        email_code: value,
        email: email,
        inviter_code: config.inviderCode,
        source: {
          device: config.device,
          channel: config.channel,
          app: config.app
        },
        related_info: config.relateInfo
      })
      props.onLogin(res.data)
    } catch (err: any) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <TransitionEffect>
      <div className="xc-mb-12">
        <ControlHead title="Sign in with email" onBack={props.onBack}></ControlHead>
      </div>

      <div className='xc-flex xc-flex-col xc-items-center xc-justify-center xc-mb-12'>
        <div className='xc-flex xc-flex-col xc-items-center xc-justify-center xc-mb-8'>
          <Mail className='xc-mb-4' size={60}></Mail>
          <p className='xc-text-lg xc-mb-1'>We’ve sent a verification code to</p>
          <p className='xc-font-bold'>{email}</p>
        </div>

        <div className='xc-mb-2 xc-h-12'>
          <Spin spinning={loading}>
            <InputOTP maxLength={6} onChange={handleOTPChange} disabled={loading}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </Spin>
        </div>
        {error && <div className='xc-text-[#ff0000]'><p>{error}</p></div>}
      </div>

      <div className='xc-text-center xc-text-sm xc-text-gray-400'>
        Not get it? {count ?`Recend in ${count}s`: <button onClick={() => sendEmailCode(email)}>Send again</button>}
      </div>

    </TransitionEffect>
  )
}
