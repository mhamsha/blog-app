import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  // useEffect(() => {
  // * authStatus  && authentication
  // & true && true == true   Home
  // & true && fasle == false login
  // & false && true == false login
  // & false && false == false login

  //   if (authStatus && authentication) {
  //     navigate("/");
  //   } else {
  //     navigate("/login");
  //   }
  //   setLoader(false);
  // }, [authStatus, authentication, navigate]);
  useEffect(() => {
    if (!authStatus && authentication) {
      // console.log("1");
      navigate("/login");
    } else if (authStatus && !authentication) {
      // console.log("2");
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, authentication, navigate]);

  return loader ? <h1>Loading...zZZ</h1> : <>{children}</>;
}

export default Protected;
