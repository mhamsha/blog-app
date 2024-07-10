import { useState } from "react";
import { InputComp, ButtonComp,LoaderComp } from "./index.js";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import appwriteAuthService from "../appwrite/appwriteAuth.js";
import { login } from "../features/authSlice.js";
import { useDispatch } from "react-redux";
import { Turnstile } from "@marsidev/react-turnstile";
import conf from "../conf/conf.js";
import { useSelector } from "react-redux";

function SignupComp() {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const [isAllowed, setIsAllowed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const createFunc = async (data) => {
    setError("");
    try {
      setIsSubmitting(true);
      const response = await appwriteAuthService.createAccount(data);
      if (response) {
        const userData = await appwriteAuthService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");

        }
      }
    } catch (error) {
      setError(error.message);
    }
    setIsSubmitting(false);
  };
  const loginWithGithub = async () => {
    try {
      const githubLoginData = await appwriteAuthService.githubLogin();
      console.log(githubLoginData);
    } catch (error) {
      setError(error.message);
    }
  };
  const currentPassword = watch("password");

  const handleSuccessTurnstile = () => {
    setIsAllowed(false);
  };

  return !isSubmitting ? (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg rounded-xl border border-black/10 bg-gray-200 p-10 dark:bg-[#1e1e1e]`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight dark:text-gray-300">
          Sign up to create account
        </h2>
        <p className="my-2 text-center text-base text-black/60 dark:text-gray-300">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="text-primary font-medium transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>{" "}
        </p>
        {error && <p className="mt-8 text-center text-red-600">{error}</p>}

        <form onSubmit={handleSubmit(createFunc)}>
          <div className="space-y-5">
            {errors.name && (
              <p className="mt-2 text-red-600">{errors.name.message}</p>
            )}
            <InputComp
              type="text"
              label="Name: "
              placeholder="Full Name"
              {...register("name", {
                required: "Name is required",
                validate: {
                  matchPatern: (value) =>
                    /^[A-Za-z ]{4,30}$/.test(value) ||
                    "6-30 chars, no special chars, must start with a letter.",
                },
              })}
            />
            {errors.email && (
              <p className="mt-2 text-red-600">{errors.email.message}</p>
            )}
            <InputComp
              type="email"
              label="Email: "
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {errors.password && (
              <p className="mt-2 text-red-600">{errors.password.message}</p>
            )}
            <InputComp
              type="password"
              label="Password: "
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                validate: {
                  matchPatern: (value) =>
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ||
                    "At least 8 characters, including letters and numbers",
                },
              })}
            />
            {errors.repeat_password && (
              <p className="mt-2 text-red-600">
                {errors.repeat_password.message}
              </p>
            )}
            <InputComp
              type="password"
              label="Repeat Password: "
              placeholder="Repeat Password"
              {...register("repeat_password", {
                required: "Repeat Password is required",
                validate: (value) =>
                  value === currentPassword || "The passwords do not match",
              })}
              textColor="text-white"
            />

            <div className="flex justify-center">
              <Turnstile
                siteKey={conf.cloudFlareSiteKey}
                onSuccess={(response) => {
                  if (response) handleSuccessTurnstile();
                }}
                onError={(error) => {
                  if (error) handleSuccessTurnstile();
                }}
                options={{
                  action: "submit-form",
                  theme: isDarkMode ? "dark" : "light",
                  size: "normal",
                }}
              />
            </div>
            <ButtonComp
              bgColor="bg-blue-500"
              textColor="text-white"
              type="submit"
              className="dark:bg-blue-700 dark:opacity-80 dark:hover:bg-blue-700 dark:hover:opacity-95"
              disabled={isAllowed}
            >
              Create Account
            </ButtonComp>
          </div>
        </form>
        <ButtonComp
          bgColor="bg-gray-800"
          hover="hover:bg-gray-900"
          textColor="text-white"
          type="button"
          className="mt-2 flex items-center justify-center gap-x-2"
          onClick={loginWithGithub}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="white"
            className=""
            viewBox="0 0 1792 1792"
          >
            <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
          </svg>
          Continue with GitHub
        </ButtonComp>
      </div>
    </div>
  ) : (
    <LoaderComp />
  );
}

export default SignupComp;
