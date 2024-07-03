import React, { useState } from "react";
import { InputComp, ButtonComp, LogoComp } from "./index.js";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import appwriteAuthService from "../appwrite/appwriteAuth.js";
import { login } from "../features/authSlice.js";
import { useDispatch } from "react-redux";

function SignupComp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  // const create = (data) => {
  //   setError("");

  //   appwriteAuthService.createAccount(data)
  //     .then(() => appwriteAuthService.getCurrentUser().then((userData) => dispatch(login(userData) && navigate("/")))
  //     )

  //     .catch((error) => {
  //       setError(error);
  //     });
  // };
  const createFunc = async (data) => {
    setError("");
    try {
      const userData = await appwriteAuthService.createAccount(data);
      if (userData) {
        const userData = await appwriteAuthService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
          // console.log(userData)
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div>
          {/* <span className="inline-block w-full max-w-[100px]">
            <LogoComp />
          </span> */}
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>{" "}
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(createFunc)}>
          <div className="space-y-5">
            <InputComp
              type="text"
              label="Name: "
              placeholder="Full Name"
              {...register("name", {
                required: true,
              })}
            />
            <InputComp
              type="email"
              label="Email: "
              placeholder="Email Address"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
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
            <ButtonComp
              bgColor="bg-blue-500"
              textColor="text-white"
              type="submit"
              children="Create Account"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupComp;
