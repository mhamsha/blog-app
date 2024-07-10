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
        className="cursor-pointer text-3xl dark:text-white"
      />
    </div>
  );
};
export default DarkModeToggler;
