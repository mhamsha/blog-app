/* eslint-disable react/prop-types */
import { ButtonComp } from "../index";
import appwriteAuthService from "../../appwrite/appwriteAuth";
import { logout } from "../../features/authSlice";
import { logoutPostRed } from "../../features/postSlice";
import { useDispatch } from "react-redux";
function LogoutBtnComp({
  children = "Logout",
  type = "submit",
  className = "",
  ...props
}) {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    appwriteAuthService.deleteSession().then((data) => {
      dispatch(logout(data));
      dispatch(logoutPostRed());
    });
  };
  return (
    <ButtonComp
      type={type}
      className={`${className} `}
      onClick={logoutHandler}
      {...props}
    >
      {children}
    </ButtonComp>
  );
}

export default LogoutBtnComp;
