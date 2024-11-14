import PropTypes from "prop-types";
ButtonComp.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
function ButtonComp({
  children = "Button",
  type = "button",
  onClick,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`base-btn ${className} `}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonComp;
