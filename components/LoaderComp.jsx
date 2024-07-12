/* eslint-disable react/prop-types */
import { quantum } from "ldrs";
import { useSelector } from "react-redux";

quantum.register();
function LoaderComp({ height = "h-[50vh]", size = "100" , className=""}) {
  const isDarkMode = useSelector((content) => content.ui.isDarkMode);
  return (
    <div className={`w-full ${height} flex items-center justify-center ${className}`}>
      <l-quantum
        size={size}
        speed="1.2"
        color={isDarkMode ? "white" : "black"}
      />
    </div>
  );
}

export default LoaderComp;
