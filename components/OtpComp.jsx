import { ButtonComp, InputComp, ContainerComp } from ".";
import { useForm } from "react-hook-form";
import appwriteAuthService from "../appwrite/appwriteAuth";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/authSlice";
import { useSelector } from "react-redux";

function OtpComp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userData = useSelector((state) => state.auth.userData);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // * Formatted email address
  const formattedEmail = `${userData?.email.slice(0, 2)}*****@${userData?.email.substring(
    userData?.email.indexOf("@") + 1
  )}`;

  const [otpTokenData, setOtpTokenData] = useState(null);
  // * Function to request OTP token
  const otpRequest = async () => {
    appwriteAuthService.createOtpToken(userData.email).then(setOtpTokenData).catch(console.error);
  };

  const [isEmailPage, setIsEmailPage] = useState(true);
  const submitFunc = async (formData) => {
    // * If the email page is true, then the user will be asked to enter the email address and chages the page to OTP page

    if (isEmailPage) {
      setIsError(false);
      if (userData?.email == formData?.email) {
        await otpRequest();
        setIsEmailPage(false);
      } else {
        setIsError("Email address does not match with the registered email address");
        const errorTimeout = setTimeout(() => {
          setIsError(false);
        }, 3000);
        return () => clearTimeout(errorTimeout);
      }
    }
    // * If the email page is false, then the user will be asked to enter the OTP and verify the account
    else {
      setIsError(false);

      try {
        const isDeleteSession = await appwriteAuthService.deleteSession();
        if (formData.otp && otpTokenData?.userId && isDeleteSession) {
          const sessionResponse = await appwriteAuthService.createOtpSession(
            otpTokenData.userId,
            formData.otp
          );
          if (sessionResponse) {
            appwriteAuthService.getCurrentUser().then((user) => {
              dispatch(login(user));
            });

            // dispatch(login({ userData: { ...userData, emailVerification: true } }));
            // console.log(userData);
            navigate("/");
          }
        }
      } catch (error) {
        // console.error(error);
        setIsError("You've missed you chance to verify Account.Please Login.");
        const errorTimeout = setTimeout(() => {
          setIsError(false);
          dispatch(logout());
          navigate("/login");
        }, 4000);
        return () => clearTimeout(errorTimeout);
      }
    }
  };
  // * Popup to confirm the OTP entered by the user
  const handleVerifyClick = (formData) => {
    const isConfirmed = window.confirm(
      "Please double-check your OTP, If you write wrong OTP, you have to Login again.\nIf you don't get the OTP, you can resend it."
    );
    if (isConfirmed) {
      submitFunc(formData);
    }
  };

  // * Timer for resend otp and disable the link for 60 seconds
  const [isLinkDisabled, setIsLinkDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    let interval;
    if (isLinkDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsLinkDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isLinkDisabled, timer]);

  const handleResendClick = () => {
    setIsLinkDisabled(true);
    setTimer(60);
  };

  return (
    //  * If the email page is true, then the user will be asked to enter the email address and chages the page to OTP page
    <ContainerComp>
      <main className="relative min-[70vh] flex flex-col justify-center overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24 ">
          <div className="flex justify-center ">
            <div className="max-w-md mx-auto text-center bg-slate-100 px-4 sm:px-8 py-10 rounded-xl shadow ">
              {/* // * Contains Heading, paragraph and error message */}
              <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
                <p className="text-[15px]  text-slate-500 ">
                  {!isEmailPage
                    ? ` We have sent a 6-digit code to your email ${formattedEmail}`
                    : `Please Enter a ${formattedEmail} , we'll send a 6-digit code to your email address.`}
                </p>
                {isError || errors.email || errors.otp ? (
                  <p className="text-red-600 mt-2 text-center">
                    {isError || errors.email?.message || errors.otp?.message}
                  </p>
                ) : (
                  ""
                )}
              </header>
              {/* // * Contains Input fields (email and otp) */}
              <form
                onSubmit={isEmailPage ? handleSubmit(submitFunc) : handleSubmit(handleVerifyClick)}
              >
                <div className="flex items-center justify-center gap-3">
                  {!isEmailPage ? (
                    <InputComp
                      type="number"
                      placeholder="Enter Code"
                      className="w-8 h-8 text-center text-2xl  font-bold t text-slate-900 bg-slate-100 border border-indigo-400 hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                      {...register("otp", {
                        required: true,
                        pattern: {
                          value: /^[1-9]\d{5}$/,
                          message: "Please enter a 6 digit code",
                        },
                      })}
                    />
                  ) : (
                    <InputComp
                      type="email"
                      placeholder="Enter Your Valid Email Address"
                      className="w-8 h-8 text-center sm:text-xl text-md  sm:font-semibold  text-slate-900 bg-slate-100 border border-indigo-400 hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                      {...register("email", {
                        required: true,
                        validate: {
                          matchPatern: (value) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        },
                      })}
                    />
                  )}
                </div>
                <div className="max-w-[260px] mx-auto mt-4">
                  {!isEmailPage ? (
                    <ButtonComp type="submit">Verify Account</ButtonComp>
                  ) : (
                    <ButtonComp type="submit">Send OTP</ButtonComp>
                  )}
                </div>
              </form>
              {/* //* contains resend button functionality*/}
              {!isEmailPage ? (
                <div className="text-sm text-slate-500 mt-4">
                  Didn&apos;t receive code?{" "}
                  {isLinkDisabled ? (
                    <span className="font-medium text-indigo-500">{`Please wait ${timer} seconds`}</span>
                  ) : (
                    <Link
                      className="font-medium text-indigo-500 hover:text-indigo-600"
                      onClick={() => {
                        handleResendClick(), otpRequest();
                      }}
                    >
                      Resend
                    </Link>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </main>
    </ContainerComp>
  );
}

export default OtpComp;
