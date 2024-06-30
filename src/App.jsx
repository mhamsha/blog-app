import "./App.css";
import { HeaderComp, FooterComp } from "../components";
import React,{ useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login as loginStore, logout as logoutStore } from "../features/authSlice";
import appwriteAuthService from "../appwrite/appwriteAuth";
import { Outlet } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteAuthService
      .getCurrentUser()
      .then((user) => (user ? dispatch(loginStore(user)) : dispatch(logoutStore())))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <h1 className="bg-slate-500 text-white">Loading...zZZ</h1>
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
