/* eslint-disable react/prop-types */
function ButtonComp({
  children = "Button",
  type = "button",
  width = "w-full",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  hover = "hover:bg-blue-700 ",
  font = "font-semibold",
  className = "",
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-md p-1 shadow-md transition-all ${font} font-sans ${bgColor} ${textColor} ${hover} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonComp;
