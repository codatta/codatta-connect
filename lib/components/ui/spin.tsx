import { cn } from "@udecode/cn"
import { LoaderCircle } from "lucide-react"

export default function Spin(props: { spinning: boolean, children: React.ReactNode, className?:string }) {
  const { spinning, children, className } = props

  return <div className="xc-inline-block xc-relative">
    {children}
    {spinning && <div className={cn("xc-absolute xc-top-0 xc-left-0 xc-w-full xc-h-full xc-bg-black xc-bg-opacity-10 xc-flex xc-items-center xc-justify-center", className)}>
      <LoaderCircle className="xc-animate-spin"></LoaderCircle>
    </div>}
  </div>

}