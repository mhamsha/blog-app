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
