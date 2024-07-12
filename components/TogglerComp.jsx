import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../features/themeSlice";
const DarkModeToggler = () => {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const dispatch = useDispatch();
  const toggleModeHandler = () => {
    dispatch(toggleMode());
  };
  return (
    <div>
      <Icon
        onClick={toggleModeHandler}
        icon={isDarkMode ? "circum:dark" : "iconamoon:mode-light"}
        className="cursor-pointer bg-white text-3xl text-black dark:bg-[#1e1e1e] dark:text-white sm:dark:bg-transparent"
      />
    </div>
  );
};
export default DarkModeToggler;
