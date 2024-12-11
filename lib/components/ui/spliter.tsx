import { cn } from "@udecode/cn";

export default function Spliter(props: { children?: React.ReactNode, className: string }) {
  const { className } = props

  return <div className={cn("xc-flex xc-items-center xc-gap-2")}>
    <hr className={cn("xc-flex-1 xc-border-gray-200", className)}></hr>
    <div className="xc-shrink-0">
      {props.children}
    </div>
    <hr className={cn("xc-flex-1 xc-border-gray-200", className)}></hr>
  </div>

}