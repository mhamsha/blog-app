/* eslint-disable react/prop-types */
import { ButtonComp } from "../index";
import appwriteAuthService from "../../appwrite/appwriteAuth";
import { logout } from "../../features/authSlice";
import { logoutPostRed } from "../../features/postSlice";
import { useDispatch } from "react-redux";
function LogoutBtnComp({ children = "logout", type = "submit", className = "", ...props }) {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    appwriteAuthService.deleteSession().then((data) => {
      dispatch(logout(data));
      dispatch(logoutPostRed());
    });
  };
  return (
    <ButtonComp
      bgColor="bg-gray-300"
      textColor="text-gray-600"
      type={type}
      className={`inline-bock m-2 px-2 py-1 duration-200 h rounded-full hover:bg-red-500 hover:text-white transition-all ${className}`}
      onClick={logoutHandler}
      {...props}
    >
      {children}
    </ButtonComp>
  );
}

export default LogoutBtnComp;
