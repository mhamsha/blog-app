/* eslint-disable react/prop-types */
function ButtonComp({
  children = "Button",
  type = "button",
  width = "w-full",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  hover = "hover:bg-blue-700 ",
  className = "",
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-1 rounded-md transition-all shadow-md font-semibold  font-sans ${bgColor} ${textColor} ${hover} ${width}   ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonComp;
