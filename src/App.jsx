import "./App.css";
import { HeaderComp, FooterComp, SignupComp } from "../components";
import { useState, useEffect } from "react";
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
    <div>
      <HeaderComp />
      <main>
        <Outlet />
      </main>
      <FooterComp />
    </div>
  );
}

export default App;
