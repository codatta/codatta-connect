import { LoaderCircle } from "lucide-react"

export default function Spin(props: { spinning: boolean, children: React.ReactNode }) {
  const { spinning, children } = props

  return <div className="xc-inline-block xc-relative">
    {children}
    {spinning && <div className="xc-absolute xc-top-0 xc-left-0 xc-w-full xc-h-full xc-bg-white xc-bg-opacity-40 xc-flex xc-items-center xc-justify-center">
      <LoaderCircle className="xc-animate-spin"></LoaderCircle>
    </div>}
  </div>

}