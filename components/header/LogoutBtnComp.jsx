import React from "react";
import { ButtonComp } from "../index";
import appwriteAuthService from "../../appwrite/appwriteAuth";
import { useDispatch } from "react-redux";
function LogoutBtnComp() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    appwriteAuthService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <ButtonComp
      children="Logout"
      type="button"
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    />
  );
}

export default LogoutBtnComp;
