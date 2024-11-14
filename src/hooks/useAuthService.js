import { useSelector } from "react-redux";

// Custom hook to get authentication status
export const useAuthUserStatus = () => {
  const authUserStatus = useSelector((state) => state.auth.status);
  return authUserStatus;
};

// Custom hook to get authenticated user data
export const useAuthUserData = () => {
  const authUserData = useSelector((state) => state.auth.userData);
  return authUserData;
};