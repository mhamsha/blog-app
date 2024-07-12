/* eslint-disable react/prop-types */
import { ButtonComp } from "../index";
import appwriteAuthService from "../../appwrite/appwriteAuth";
import { logout } from "../../features/authSlice";
import { logoutPostRed } from "../../features/postSlice";
import { useDispatch } from "react-redux";
function LogoutBtnComp({
  children = "logout",
  type = "submit",
  hover = "hover:bg-red-500",
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
      bgColor="bg-gray-300"
      textColor="text-gray-600"
      hover={hover}
      type={type}
      className={`inline-bock h m-2 rounded-full px-2 py-1 transition-all duration-200 hover:text-white  ${className}  `}
      onClick={logoutHandler}
      
      {...props}
    >
      {children}
    </ButtonComp>
  );
}

export default LogoutBtnComp;
