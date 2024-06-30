import React from "react";

function ButtonComp({
    children, 
    type = "button",
    onClick, 
    className = "", 
    bgColor = "bg-red-600",
    textColor = "text-white",
    ...props }
) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${bgColor} ${textColor} px-4 py-2 rounded-lg  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonComp;
