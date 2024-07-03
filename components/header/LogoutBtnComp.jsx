import React from "react";
import { ButtonComp } from "../index";
import appwriteAuthService from "../../appwrite/appwriteAuth";
import { logout } from "../../features/authSlice";
import { useDispatch } from "react-redux";
function LogoutBtnComp({
  children = "logout",
  type = "submit",
  onClick,
  className = "",
  ...props
}) {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    appwriteAuthService.deleteSession().then((data) => {
      dispatch(logout(data));
    });
  };
  return (
    <ButtonComp
      children={children}
      bgColor="bg-gray-300"
      textColor="text-gray-600"
      type={type}
      className={`inline-bock px-6 py-2 duration-200 h rounded-full hover:bg-red-500 hover:text-white transition-all ${className}`}
      onClick={logoutHandler}
      {...props}
    />
  );
}

export default LogoutBtnComp;
