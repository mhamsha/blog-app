import React from "react";

function ButtonComp({
    children, 
    type = "button",
    onClick, 
    className = "", 
    ...props }
) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 text-white px-4 py-2 rounded-lg  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonComp;
