import "./App.css";
import { HeaderComp, FooterComp, LoaderComp } from "../components";
import  { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login as loginStore, logout as logoutStore } from "../features/authSlice";
import appwriteAuthService from "../appwrite/appwriteAuth";
import { Outlet } from "react-router-dom";
function App() {
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // console.log("App.js rendered");

  useEffect(() => {
    appwriteAuthService
      .getCurrentUser()
      .then((user) => (user ? dispatch(loginStore(user)) : dispatch(logoutStore())))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  return loading ? (
    <div>
      <LoaderComp />
    </div>
  ) : (
    <div className="h-full">
      <HeaderComp />
      <main>
        <Outlet />
      </main>
      <FooterComp />
    </div>
  );
}

export default App;
