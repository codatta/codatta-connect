export default function Spliter(props: { children?: React.ReactNode }) {

  return <div className="xc-flex xc-items-center xc-gap-2">
    <hr className="xc-flex-1 xc-border-gray-200"></hr>
    <div className="xc-shrink-0">
      {props.children}
    </div>
    <hr className="xc-flex-1 xc-border-gray-200"></hr>
  </div>

}