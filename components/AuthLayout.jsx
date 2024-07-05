/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoaderComp } from "../components";

function Protected({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStatus && authentication) {
      navigate("/login");
    } else if (authStatus && !authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, authentication, navigate]);

  return loader ? (
    <div>
      <LoaderComp />
    </div>
  ) : (
    <>{children}</>
  );
}

export default Protected;

// export default function Protected({ children, authentication = true, checkOtpPage = false }) {
//   const authStatus = useSelector((state) => state.auth.status);
//   const otpStatus = useSelector((state) => state.auth.otpStatus);
//   const [loader, setLoader] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Redirect logic for OTP verification page
//     if (checkOtpPage) {
//       if (!otpStatus || authStatus) {
//         // If OTP status is false or user is already authenticated, redirect to login or home page
//         navigate(authStatus ? "/" : "/signup");
//       }
//     } else {
//       // Existing redirect logic for other scenarios
//       if (!authStatus && authentication && !otpStatus) {
//         navigate("/login");
//       } else if (authStatus && !authentication && !otpStatus) {
//         navigate("/");
//       }
//        else if (otpStatus && !authentication && !authStatus) {
//         navigate("/signup/otp-varification");
//       }
//     }
//     setLoader(false);
//   }, [authStatus, authentication, navigate, otpStatus, checkOtpPage]);

//   return loader ? (
//     <div>
//       <LoaderComp />
//     </div>
//   ) : (
//     <>{children}</>
//   );
// }
