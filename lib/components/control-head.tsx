import { ArrowLeft } from 'lucide-react'

export default function ControlHead(props: { title: string; onBack: () => void }) {
  const { title } = props

  return (
    <div className="xc-flex xc-items-center xc-gap-2">
      <ArrowLeft onClick={props.onBack} size={20} className="xc-cursor-pointer"></ArrowLeft>
      <span>{title}</span>
    </div>
  )
}
