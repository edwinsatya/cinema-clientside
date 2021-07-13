import Layout from "../../components/layout/Layout";
import Image from "next/image";
import ImgBg from "../../public/images/bg-intro.jpeg";
import Link from "next/link";
import ButtonLogo from "../../components/buttons/ButtonLogo";
import { useRecoilState } from "recoil";
import { currentUser as currentUserAtom } from "../../store";
import { useRef, useState, useEffect } from "react";
import { cinemaAPI } from "../../services/api";
import { useRouter } from "next/router";

export default function Login() {
  const [emailValid, setEmailValid] = useState(false);
  const [errMsgEmail, setErrMsgEmail] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [errMsgPassword, setErrMsgPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsgSubmit, setErrMsgSubmit] = useState("");
  const inputEmail = useRef("");
  const inputPassword = useRef("");

  const router = useRouter();

  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

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

  const resetForm = () => {
    inputEmail.current.value = "";
    inputPassword.current.value = "";
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (emailValid && passwordValid) {
        const body = {
          email: inputEmail.current.value,
          password: inputPassword.current.value,
        };

        const response = await cinemaAPI.post(`/users/login`, body);
        const token = response.data.token;
        localStorage.setItem("token", token);
        setCurrentUser(token);
        setErrMsgSubmit("");
        router.push("/home");
      } else {
        validationEmail();
        validationPassword();
      }
    } catch (error) {
      console.log(error.response.data, "err res");
      setErrMsgSubmit(error.response.data.errors.message);
      resetForm();
    }
  };

  useEffect(() => {
    console.log(currentUser, "state current user");
  }, [currentUser]);

  return (
    <Layout title="Login">
      <header>
        <div className="absolute bg-transparent top-0 z-50 p-4 md:px-8 lg:px-12 flex justify-between items-center">
          <div className="w-2/12">
            <Link href="/" passHref>
              <ButtonLogo />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div className="w-full relative h-screen">
          <Image
            src={ImgBg}
            alt="bg-intro"
            layout={"fill"}
            objectFit={"cover"}
            quality={100}
            priority={true}
          />
          <div className="absolute transform transition-all top-0 left-0 w-full h-full z-10 bg-gradient-to-br  from-black via-transparent to-black opacity-50 duration-500"></div>
          <div
            className={`relative flex justify-center items-start md:items-center z-20  w-full h-full`}
          >
            <div className="relative rounded-md w-full  md:max-w-xl bg-black md:bg-opacity-80 h-full md:h-4/6 py-3 px-4 md:px-14 md:py-12"></div>
            <div className="absolute rounded-md w-full md:max-w-xl pt-20 px-4 md:px-14 md:py-12">
              <div className="text-white text-3xl font-extrabold mb-6">
                Sign In
              </div>
              <div
                className={`${
                  errMsgSubmit ? "block" : "hidden"
                } w-full bg-blue-800 rounded-md p-2 sm:p-3 lg:p-4 mb-4`}
              >
                <span className="text-white font-semibold text-sm md:text-base">
                  Incorrect email or password.
                </span>
                <span className="text-white font-medium text-sm md:text-base ml-2">
                  Please try again
                </span>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <input
                      ref={inputEmail}
                      type="email"
                      autoComplete="current-email"
                      required
                      placeholder="Email"
                      onChange={(e) => validationEmail(e.target.value)}
                      className={`text-white focus:outline-none px-4 py-3 w-full rounded-md bg-gray-800 focus:bg-gray-600 ${
                        !emailValid && errMsgEmail
                          ? "border-b-2 border-blue-800"
                          : ""
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
                  <div className="flex flex-col mt-5">
                    <div className="relative w-full">
                      <input
                        ref={inputPassword}
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        placeholder="Password"
                        onChange={(e) => validationPassword(e.target.value)}
                        className={`text-white focus:outline-none px-4 py-3 w-full rounded-md bg-gray-800 focus:bg-gray-600 ${
                          !passwordValid && errMsgPassword
                            ? "border-b-2 border-blue-800"
                            : ""
                        }`}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-white absolute right-4 top-4"
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
                    </div>
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
                      className="bg-primary hover:bg-blue-600 text-lg text-white w-full py-2 rounded-md focus:outline-none"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-10 flex">
                <span className="text-gray-400 mr-3">No have account?</span>
                <Link href="/register">
                  <a className="text-white font-bold hover:text-gray-300">
                    Sign up now
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <hr className="border-b-4 border-gray-500 shadow-2xl" />
    </Layout>
  );
}
