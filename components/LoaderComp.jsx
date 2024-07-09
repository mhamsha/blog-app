/* eslint-disable react/prop-types */
import { quantum } from "ldrs";

quantum.register();
function LoaderComp({ height = "h-[50vh]", size = "100" }) {
  return (
    <div className={`w-full ${height} flex items-center justify-center `}>
      <l-quantum size={size} speed="1.2" color="black" />
    </div>
  );
}

export default LoaderComp;
