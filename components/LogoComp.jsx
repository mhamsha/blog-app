import React from "react";

function LogoComp({ children,textColor="text-green-700" ,clasName = "" }) {
  return (
    <div className={`${textColor} text text-2xl p-1  ${clasName} `}>{children ? children : "mhamsha"} </div>
  );
}

export default LogoComp;
