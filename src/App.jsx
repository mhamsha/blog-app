import "./App.css";
import { HeaderComp, FooterComp, LoaderComp } from "../components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login as loginStore,
  logout as logoutStore,
} from "../features/authSlice";
import appwriteAuthService from "../appwrite/appwriteAuth";
import { Outlet } from "react-router-dom";
function App() {
  const isDarkMode = useSelector((content) => content.ui.isDarkMode);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // console.log("App.js rendered");

  useEffect(() => {
    appwriteAuthService
      .getCurrentUser()
      .then((user) =>
        user ? dispatch(loginStore(user)) : dispatch(logoutStore()),
      )
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  return loading ? (
    <div className={`${isDarkMode ? "dark-bg dark" : ""} min-h-screen w-full`}>
      <LoaderComp height="h-[80vh]" />
    </div>
  ) : (
    <div className={`${isDarkMode ? "dark-bg dark" : ""} min-h-screen w-full`}>
      <HeaderComp />
      <main>
        <Outlet />
      </main>
      <FooterComp />
    </div>
  );
}

export default App;
