import React from "react";
import { ButtonComp } from "../index";
import appwriteAuthService from "../../appwrite/appwriteAuth";
import { logout } from "../../features/authSlice";
import { useDispatch } from "react-redux";
function LogoutBtnComp({ children="logout", type = "submit", onClick, ...props }) {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    appwriteAuthService.deleteSession().then((data) => {
      dispatch(logout(data));
    });
  };
  return (
    <ButtonComp
      children={children}
      
      type={type}
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full"
      onClick={logoutHandler}
      {...props}
    />
  );
}

export default LogoutBtnComp;
