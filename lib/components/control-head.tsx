// Import arrow icon from Lucide React library
import { ArrowLeft } from "lucide-react";

// Control head component that displays a title with back button
// Props:
// - title: string - The title text to display
// - onBack: () => void - Callback function when back button is clicked
export default function ControlHead(props: {
  title: string;
  onBack: () => void;
}) {
  const { title } = props;

  return (
    // Container with flex layout for back button and title
    <div className="xc-flex xc-items-center xc-gap-2">
      {/* Back button with arrow icon */}
      <ArrowLeft
        onClick={props.onBack}
        size={20}
        className="xc-cursor-pointer"
      ></ArrowLeft>
      {/* Title text */}
      <span>{title}</span>
    </div>
  );
}
