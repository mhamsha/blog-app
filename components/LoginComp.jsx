import { useState } from "react";
import { InputComp, ButtonComp } from "./index.js";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import appwriteAuthService from "../appwrite/appwriteAuth.js";
import { login } from "../features/authSlice.js";
import { useDispatch } from "react-redux";

function LoginComp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const loginFunc = async (data) => {
    setError("");
    try {
      const session = await appwriteAuthService.createSession(data);
      if (session) {
        const userData = await appwriteAuthService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div>{/* Logo */}</div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>{" "}
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(loginFunc)}>
          <div className="space-y-5">
            <InputComp
              type="email"
              label="Email: "
              placeholder="Email Address"
              {...register("email", {
                required: true,
              })}
            />
            <InputComp
              type="password"
              label="Password: "
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />
            <ButtonComp bgColor="bg-blue-500" textColor="text-white" type="submit">
              Log In
            </ButtonComp>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginComp;
