/* eslint-disable react/prop-types */
import { useId, forwardRef } from "react";
import { useSelector } from "react-redux";

function Select({ options, label, className, ...props }, ref) {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full cursor-pointer rounded-lg border border-gray-400 bg-white px-3 py-2 text-black outline-none duration-200 focus:bg-gray-50 dark:border-gray-400 dark:bg-transparent dark:text-white ${className}`}
      >
        {options?.map((option) => (
          <option
            key={option}
            value={option}
            className={isDarkMode ? "optionSelect" : ""}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
const SelectComp = forwardRef(Select);

export default SelectComp;
