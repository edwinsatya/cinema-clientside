import Layout from "../../components/layout/Layout";
import ButtonLogo from "../../components/buttons/ButtonLogo";
import Link from "next/link";
import { preRegister as preRegisterAtom } from "../../store";
import { useRecoilValue } from "recoil";
import { useRef, useState, useEffect } from "react";

export default function Register() {
  const [emailValid, setEmailValid] = useState(false);
  const [errMsgEmail, setErrMsgEmail] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [errMsgPassword, setErrMsgPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsgSubmit, setErrMsgSubmit] = useState("");
  const inputEmail = useRef("");
  const inputPassword = useRef("");
  const emailPreRegister = useRecoilValue(preRegisterAtom);

  const validationEmail = (e) => {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!e) {
      setEmailValid(false);
      setErrMsgEmail("Email is required");
    } else if (!emailPattern.test(e)) {
      setEmailValid(false);
      setErrMsgEmail("Please enter a valid email");
    } else {
      setEmailValid(true);
    }
  };

  const validationPassword = (e) => {
    if (!e) {
      setPasswordValid(false);
      setErrMsgPassword("Password is required");
    } else if (e.length < 8) {
      setPasswordValid(false);
      setErrMsgPassword("Your password must higher then 7 characters");
    } else {
      setPasswordValid(true);
    }
  };

  return (
    <Layout title="Register">
      <header className="sticky top-0 z-50">
        <div className="relative border-b border-gray-200 bg-white p-4 md:px-8 lg:px-12 flex items-center justify-between">
          <div className="w-2/12">
            <Link href="/" passHref>
              <ButtonLogo />
            </Link>
          </div>
          <div>
            <Link href="/login">
              <a className="text-sm sm:p-2 cursor-pointer sm:text-base lg:text-2xl leading-relaxed font-base hover:underline">
                Sign In
              </a>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div className="relative h-100 bg-white p-6 pb-28 sm:pb-0 flex justify-center items-center">
          <div className="relative w-full max-w-md flex flex-col">
            <div className="bg-primary flex items-center px-3 py-4">
              <div className="pr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-sm sm:text-base lg:text-lg text-white">
                Incorrect password. Please try again or you can bla baldasldslad
              </div>
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-semibold mt-5 flex flex-col">
              <span>Welcome back!</span>
              <span>
                Joining <span className="text-primary">Cinema21</span> is easy.
              </span>
            </div>
            <div className="text-base sm:text-lg lg:text-xl mt-4">
              Enter your password and you'll be watching in no time.
            </div>
            <div className="mt-4">
              <form>
                {emailPreRegister ? (
                  <div className="flex flex-col">
                    <span className="text-base sm:text-base lg:text-lg font-light">
                      Email
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg font-bold">
                      {emailPreRegister}
                    </span>
                  </div>
                ) : (
                  <div>
                    <input
                      ref={inputEmail}
                      type="email"
                      autoComplete="current-email"
                      required
                      placeholder="email@gmail.com"
                      onChange={(e) => validationEmail(e.target.value)}
                      className={`text-black focus:outline-none px-4 py-5 w-full rounded-md border border-black  ${
                        !emailValid && errMsgEmail
                          ? "border-2 border-blue-800"
                          : "focus:border-green-500"
                      }`}
                    />
                    <span
                      className={`text-blue-800 text-sm mt-1 ${
                        !emailValid ? "inline-block" : "hidden"
                      }`}
                    >
                      {errMsgEmail}
                    </span>
                  </div>
                )}

                <div className="relative w-full mt-4">
                  <input
                    ref={inputPassword}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="Password"
                    onChange={(e) => validationPassword(e.target.value)}
                    className={`text-black focus:outline-none px-4 py-5 w-full rounded-md border border-black  ${
                      !passwordValid && errMsgPassword
                        ? "border-2 border-blue-800"
                        : "focus:border-green-500"
                    }`}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-black cursor-pointer absolute right-4 top-6"
                  >
                    {!showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </span>
                  <span
                    className={`text-blue-800 text-sm mt-1 ${
                      !passwordValid ? "inline-block" : "hidden"
                    }`}
                  >
                    {errMsgPassword}
                  </span>
                </div>
                <div className="mt-10">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-blue-600 text-xl text-white w-full py-3 rounded-md focus:outline-none"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
