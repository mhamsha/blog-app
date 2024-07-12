/* eslint-disable react/prop-types */
import { useId, forwardRef } from "react";
const InputComp = forwardRef(function InputComp(
  {
    type = "text",
    placeholder = "Enter text",
    width = "w-full",
    label,
    className = "",
    ...props
  },
  ref,
) {
  const inputId = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 inline-block pl-1 dark:text-white"
        >
          {label}{" "}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        className={`${width} rounded-lg border border-gray-400 bg-white px-3 py-2 text-black outline-none duration-200 focus:border-cyan-900 dark:bg-transparent dark:text-white ${className}` }
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default InputComp;
