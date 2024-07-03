import { quantum } from "ldrs";

function LoaderComp() {
  quantum.register();

  return (
    <div className="w-full h-[50vh] flex items-center justify-center ">
      <l-quantum size="100" speed="1.2" color="black" />
    </div>
  );
}

export default LoaderComp;
