// import { useForm } from 'antd/es/form/Form'
import ControlHead from './control-head'
import TransitionEffect from './transition-effect'
// import { Form, message } from 'antd'
import { useEffect, useState } from 'react'
// import accountApi from '@/api/account.api'
// import { useCodattaSigninContext } from '../codatta-signin-context-provider'

export default function EmailLoginWidget(props: {
  onLogin: (token: string, uid: string, new_user: boolean) => void
  onBack: () => void
  source: string
}) {
  // const { onLogin, onBack, source } = props
  // const [form] = useForm()
  const [_email, _setEmail] = useState('')
  // const [imageData, setImageData] = useState<string>()
  // const [captchaCode, setCaptchaCode] = useState('')
  // const [verifyCode, setVerifyCode] = useState('')
  const [_captchaLoading, setCaptchaLoading] = useState(false)
  // const [sendCodeLoading, setSendCodeLoading] = useState(false)
  const [_count, _setCount] = useState(0)
  const [_loading, _setLoading] = useState(false)

  // const { saveLastUsedInfo } = useCodattaSigninContext()

  // const isEmail = useMemo(() => {
  //   const hasChinese =
  //     /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]/gu
  //   const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  //   return !hasChinese.test(email) && isEmail.test(email)
  // }, [email])

  // async function handleFormSubmit(value: any) {
  //   setLoading(true)
  //   try {
  //     const res = await accountApi.emailLogin(
  //       null,
  //       null,
  //       {
  //         email: value.email,
  //         email_code: value.email_code,
  //       },
  //       source,
  //     )
  //     onLogin(res.token, res.user_info?.user_id, !!res.user_info?.new_user)
  //     saveLastUsedInfo({
  //       connector: 'codatta-connect',
  //       method: 'email',
  //     })
  //   } catch (err: any) {
  //     console.log(err.message)
  //   }
  //   setLoading(false)
  // }

  // function startCountDown() {
  //   let countDown = 60
  //   setCount(--countDown)
  //   const timer = setInterval(() => {
  //     setCount(--countDown)
  //     if (countDown <= 0) {
  //       clearInterval(timer)
  //     }
  //   }, 1000)
  // }

  // async function sendEmailCode() {
    // try {
    //   await form.validateFields(['captchaCode'])
    //   setSendCodeLoading(true)
    //   const res = await accountApi.sendEmailCode(email, captchaCode)
    //   message.success(`We have send a email to ${email}`)
    //   startCountDown()
    // } catch (err: any) {
    //   if (err.errorFields) return
    //   getCaptchaCode()
    //   message.error(err.message)
    // }
    // setSendCodeLoading(false)
  // }

  async function getCaptchaCode() {
    setCaptchaLoading(true)
    try {
      // const res = await accountApi.getEmailCaptchaCode()
      // console.log(res)
      // setImageData(res)
    } catch (err: any) {
      // message.error(err.message)
    }
    setCaptchaLoading(false)
  }

  useEffect(() => {
    getCaptchaCode()
  }, [])

  return (
    <TransitionEffect>
      <div className="mb-12">
        <ControlHead title="Sign in with email" onBack={props.onBack}></ControlHead>
      </div>

      {/* <Form size="large" form={form} onFinish={handleFormSubmit} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
        >
          <div className="rounded-3 relative flex gap-4 overflow-hidden border border-gray-100 px-4 py-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="flex-1 bg-transparent p-0 text-base outline-none [&:-webkit-autofill]:border-none"
              placeholder="Email"
            />
            <div
              className="absolute right-0 top-0 block flex h-full w-[120px] items-center justify-center"
              onClick={sendEmailCode}
            >
              <button
                type="button"
                disabled={!isEmail || count > 0}
                className="block flex h-full w-full items-center justify-center bg-gray-200 disabled:cursor-not-allowed disabled:opacity-20"
              >
                {sendCodeLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span>{count > 0 ? `Resend (${count}s)` : 'Send a code'}</span>
                )}
              </button>
            </div>
          </div>
        </Form.Item>

        <Form.Item label="" name="captchaCode" rules={[{ required: true, message: 'Please input code in the image' }]}>
          <div className="rounded-3 relative flex gap-4 overflow-hidden border border-gray-100 px-4 py-3">
            <input
              onChange={(e) => setCaptchaCode(e.target.value)}
              type="text"
              className="flex-1 bg-transparent p-0 text-base outline-none"
              placeholder="Enter image code"
            />
            <div
              className="absolute right-0 top-0 block flex h-full w-[120px] items-center justify-center"
              onClick={getCaptchaCode}
            >
              {captchaLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <img src={`${imageData}`} className="h-full w-full" alt="" />
              )}
            </div>
          </div>
        </Form.Item>

        <Form.Item
          label="Verification Code"
          name="email_code"
          rules={[{ required: true, message: 'Please input code!' }]}
        >
          <div className="rounded-3 flex gap-4 border border-gray-100 px-4 py-3">
            <input
              type="text"
              onChange={(e) => setVerifyCode(e.target.value)}
              className="flex-1 bg-transparent p-0 text-base outline-none"
              placeholder="Enter verification code"
            />
          </div>
        </Form.Item>

        <div className="mt-12 flex">
          <button type="submit" className="bg-primary w-25 ml-auto flex justify-center rounded-full px-6 py-2">
            {loading ? <Loader2 className="animate-spin" size={22} /> : 'Sign in'}
          </button>
        </div>
      </Form> */}
    </TransitionEffect>
  )
}
