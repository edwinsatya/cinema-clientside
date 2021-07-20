import Layout from "../../../components/layout/Layout";
import ButtonLogo from "../../../components/buttons/ButtonLogo";
import Link from "next/link";
import PuffLoader from "react-spinners/PuffLoader";
import RingLoader from "react-spinners/RingLoader";
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";
import { io } from "socket.io-client";
import { useRouter } from "next/router";
import { cinemaAPI } from "../../../services/api";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { currentUser as currentUserAtom } from "../../../store";

const overrideHide = css`
  overflow: hidden;
  display: none;
`;

const overrideShow = css`
  overflow: hidden;
`;

export default function VerifyOtp() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

  const listColor = {
    one: "#B6C9F0",
    two: "#B5EAEA",
    three: "#A2DBFA",
    four: "#77ACF1",
    five: "#39A2DB",
    six: "#185ADB",
    success: "#54E346",
    failed: "#FF3F00",
  };
  const [colorIcon, setColorIcon] = useState("#DBE6FD");
  const [showSignal, setShowSignal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMsg, setPopUpMsg] = useState("");
  const [countDown, setCountDown] = useState(60);
  const [shouldCount, setShouldCount] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [status, setStatus] = useState("Verification");
  const [subStatus, setSubStatus] = useState(
    "You will get a OTP via email, please check your email."
  );
  const inputOtp = useRef("");

  const handleChangeInput = (e) => {
    setStatus("Verification");
    setSubStatus("You will get a OTP via email, please check your email.");
    if (inputOtp.current.value) {
      switch (inputOtp.current.value.length) {
        case 1:
          setColorIcon(listColor.one);
          break;
        case 2:
          setColorIcon(listColor.two);
          break;
        case 3:
          setColorIcon(listColor.three);
          break;
        case 4:
          setColorIcon(listColor.four);
          break;
        case 5:
          setColorIcon(listColor.five);
          break;
        case 6:
          setColorIcon(listColor.six);
          break;
        default:
          break;
      }
      setShowSignal(true);
    } else {
      setShowSignal(false);
    }
  };

  const handleSubmitOtp = async (e) => {
    ///users/verification-otp
    try {
      e.preventDefault();
      setIsLoading(true);
      const tokenOtp = localStorage.getItem("tokenOtp");
      const body = {
        codeOtp: inputOtp.current.value,
      };
      const response = await cinemaAPI.post(`/users/verification-otp`, body, {
        headers: {
          token: tokenOtp,
        },
      });
      setCurrentUser(tokenOtp);
      // setErrMsgSubmit("");
      // router.push("/login/verify-otp");
      setTimeout(() => {
        setStatus("Successfully Verified");
        setSubStatus(response.data.message);
        setColorIcon(listColor.success);
        // setIsLoading(false);
        setTimeout(() => {
          localStorage.setItem("token", tokenOtp);
          localStorage.removeItem("tokenOtp");
          inputOtp.current.value = "";
          clearInterval(intervalId);
          setCountDown(60);
          setTimeout(() => {
            router.push("/home");
            setIsLoading(false);
          }, 500);
        }, 3000);
      }, 5000);
    } catch (error) {
      setTimeout(() => {
        if (error.response.data.status == 401) {
          setStatus("No Have Access");
          setSubStatus("Please re login again, your session is time out.");
        } else {
          setStatus("OTP Not Valid");
          setSubStatus(error.response.data.errors.message);
        }
        setColorIcon(listColor.failed);
        setIsLoading(false);
        inputOtp.current.value = "";
        if (error.response.data.status == 401) {
          setTimeout(() => {
            localStorage.removeItem("tokenOtp");
            clearInterval(intervalId);
            setCountDown(60);
            setTimeout(() => {
              router.replace("/login");
            }, 500);
          }, 3000);
        }
      }, 5000);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      setShowPopUp(true);
      const token = localStorage.getItem("tokenOtp");
      await cinemaAPI.post(`/users/send-otp`, null, {
        headers: {
          token,
        },
      });
      setShouldCount(true);
      setTimeout(() => {
        setIsSendEmail(true);
      }, 2500);
      setPopUpMsg("OTP request has been sent to your email");
      setTimeout(() => {
        setShowPopUp(false);
        setIsSendEmail(false);
      }, 5000);
    } catch (error) {
      setShouldCount(true);
      setTimeout(() => {
        setIsSendEmail(true);
      }, 2500);
      if (error.response.data.status == 401) {
        setPopUpMsg("Sorry your session is time out");
      } else {
        setPopUpMsg(error.response.data.errors.message);
      }
      setTimeout(() => {
        setShowPopUp(false);
        setIsSendEmail(false);
        setPopUpMsg("");
        if (error.response.data.status == 401) {
          localStorage.removeItem("tokenOtp");
          clearInterval(intervalId);
          setCountDown(60);
          setTimeout(() => {
            router.replace("/login");
          }, 500);
        }
      }, 5000);
    }
  };

  useEffect(() => {
    if (shouldCount) {
      let countTime = setInterval(() => {
        setCountDown((prevTime) => prevTime - 1);
      }, 1000);
      setIntervalId(countTime);
    }
  }, [shouldCount]);

  useEffect(() => {
    if (countDown == 0) {
      clearInterval(intervalId);
      setShouldCount(false);
      setCountDown(60);
    }
  }, [countDown]);

  return (
    <Layout title="Verification OTP">
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
        <div className="relative h-screen w-full bg-gray-100 flex justify-center items-center">
          <div
            className={`${
              showPopUp ? "flex" : "hidden"
            } absolute border border-gray-400 rounded-lg bg-opacity-95 flex-col justify-center items-center z-40 bg-white h-1/3 w-full max-w-lg`}
          >
            {!isSendEmail ? (
              <MoonLoader
                color={`#177ee2`}
                loading={true}
                css={overrideShow}
                size={120}
              />
            ) : (
              <span className="text-primary text-center text-xl">
                {popUpMsg}
              </span>
            )}
          </div>

          <div className="flex flex-col lg:max-w-xl justify-center items-center">
            {isLoading ? (
              <div className="relative h-40 w-auto flex justify-center items-center">
                <RingLoader
                  color={"#185ADB"}
                  loading={true}
                  css={overrideShow}
                  size={100}
                />
              </div>
            ) : (
              <div className="relative h-40 w-auto flex justify-center items-center">
                <svg
                  className="h-28 w-28 absolute"
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 512 512"
                  version="1.1"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                >
                  <path
                    d="M344.7 134.6v-14.3c0-12.9-10.4-23.3-23.3-23.3H190.6c-12.9 0-23.3 10.4-23.3 23.3v14.3h177.4zM167.3 377.4v14.3c0 12.9 10.4 23.3 23.3 23.3h130.8c12.9 0 23.3-10.4 23.3-23.3v-14.3H167.3z"
                    className="st1"
                    fill={"#3B4652"}
                  ></path>
                  <path
                    d="M167.3 148.6H344.6V363.4H167.3z"
                    className="st0"
                    fill={colorIcon}
                  ></path>
                  <g>
                    <path
                      d="M136.7 321.1H79c-3.9 0-7 3.1-7 7v66.7c-10.4 3.5-18 13.4-18 25 0 14.5 11.8 26.4 26.4 26.4s26.4-11.8 26.4-26.4c0-12.6-8.9-23.2-20.8-25.8v-58.9h50.7c3.9 0 7-3.1 7-7s-3.1-7-7-7zm-43.9 98.7c0 6.8-5.6 12.4-12.4 12.4S68 426.6 68 419.8s5.6-12.4 12.4-12.4 12.4 5.6 12.4 12.4zM136.7 176.9H86V118c11.8-2.6 20.8-13.2 20.8-25.8 0-14.5-11.8-26.4-26.4-26.4S54 77.7 54 92.2c0 11.6 7.6 21.5 18 25v66.7c0 3.9 3.1 7 7 7h57.7c3.9 0 7-3.1 7-7s-3.1-7-7-7zM68 92.2c0-6.8 5.6-12.4 12.4-12.4s12.4 5.6 12.4 12.4-5.6 12.4-12.4 12.4S68 99 68 92.2zM118.5 266.1c3.9 0 7-3.1 7-7s-3.1-7-7-7H55.3c-3.1-11.2-13.3-19.4-25.4-19.4-14.5 0-26.4 11.8-26.4 26.4s11.8 26.4 26.4 26.4c12.1 0 22.3-8.2 25.4-19.4h63.2zm-88.6 5.3c-6.8 0-12.4-5.6-12.4-12.4s5.6-12.4 12.4-12.4 12.4 5.6 12.4 12.4-5.6 12.4-12.4 12.4zM440 394.8v-66.7c0-3.9-3.1-7-7-7h-57.7c-3.9 0-7 3.1-7 7s3.1 7 7 7H426V394c-11.8 2.6-20.8 13.2-20.8 25.8 0 14.5 11.8 26.4 26.4 26.4s26.4-11.8 26.4-26.4c0-11.6-7.6-21.5-18-25zm-8.4 37.4c-6.8 0-12.4-5.6-12.4-12.4s5.6-12.4 12.4-12.4S444 413 444 419.8s-5.6 12.4-12.4 12.4zM375.3 190.9H433c3.9 0 7-3.1 7-7v-66.7c10.4-3.5 18-13.4 18-25 0-14.5-11.8-26.4-26.4-26.4s-26.4 11.8-26.4 26.4c0 12.6 8.9 23.2 20.8 25.8v58.9h-50.7c-3.9 0-7 3.1-7 7s3.1 7 7 7zm43.9-98.7c0-6.8 5.6-12.4 12.4-12.4S444 85.4 444 92.2s-5.6 12.4-12.4 12.4-12.4-5.6-12.4-12.4zM482.1 232.7c-12.1 0-22.3 8.2-25.4 19.4h-63.2c-3.9 0-7 3.1-7 7s3.1 7 7 7h63.2c3.1 11.2 13.3 19.4 25.4 19.4 14.5 0 26.4-11.8 26.4-26.4s-11.8-26.4-26.4-26.4zm0 38.7c-6.8 0-12.4-5.6-12.4-12.4s5.6-12.4 12.4-12.4 12.4 5.6 12.4 12.4-5.6 12.4-12.4 12.4zM238.2 441.3c-3.9 0-7 3.1-7 7v21h-21c-3.1-11.2-13.3-19.4-25.4-19.4-14.5 0-26.4 11.8-26.4 26.4s11.8 26.4 26.4 26.4c12.1 0 22.3-8.2 25.4-19.4h28c3.9 0 7-3.1 7-7v-28c0-3.9-3.1-7-7-7zm-53.3 47.3c-6.8 0-12.4-5.6-12.4-12.4s5.6-12.4 12.4-12.4 12.4 5.6 12.4 12.4-5.6 12.4-12.4 12.4zM327.1 449.9c-12.1 0-22.3 8.2-25.4 19.4h-21v-21c0-3.9-3.1-7-7-7s-7 3.1-7 7v28c0 3.9 3.1 7 7 7h28c3.1 11.2 13.3 19.4 25.4 19.4 14.5 0 26.4-11.8 26.4-26.4s-11.8-26.4-26.4-26.4zm0 38.7c-6.8 0-12.4-5.6-12.4-12.4s5.6-12.4 12.4-12.4 12.4 5.6 12.4 12.4-5.5 12.4-12.4 12.4zM238.2 28.7h-28c-3-11.1-13.2-19.3-25.3-19.3-14.5 0-26.4 11.8-26.4 26.4s11.8 26.4 26.4 26.4c12.1 0 22.3-8.2 25.4-19.4h21v21c0 3.9 3.1 7 7 7s7-3.1 7-7v-28c-.1-3.9-3.2-7.1-7.1-7.1zm-53.3 19.4c-6.8 0-12.4-5.6-12.4-12.4s5.6-12.4 12.4-12.4 12.4 5.6 12.4 12.4-5.6 12.4-12.4 12.4zM327.1 9.4c-12.1 0-22.3 8.2-25.4 19.4h-28c-3.9 0-7 3.1-7 7v28c0 3.9 3.1 7 7 7s7-3.1 7-7v-21h21c3.1 11.2 13.3 19.4 25.4 19.4 14.5 0 26.4-11.8 26.4-26.4S341.7 9.4 327.1 9.4zm0 38.7c-6.8 0-12.4-5.6-12.4-12.4s5.6-12.4 12.4-12.4 12.4 5.6 12.4 12.4-5.5 12.4-12.4 12.4z"
                      className="st1"
                    ></path>
                  </g>
                </svg>
                <PuffLoader
                  color={colorIcon}
                  loading={true}
                  css={showSignal ? overrideShow : overrideHide}
                  size={180}
                />
              </div>
            )}

            <div className="flex flex-col justify-center items-center">
              <span
                style={{ color: `${colorIcon}` }}
                className={`font-bold text-xl lg:text-2xl`}
              >
                {status}
              </span>
              <span className="text-gray-500 font-medium text-center text-sm mt-2">
                {subStatus}
              </span>
            </div>
            <div className=" pt-20">
              <form onSubmit={handleSubmitOtp}>
                <input
                  disabled={isLoading ? true : false}
                  ref={inputOtp}
                  autoComplete="req-otp"
                  onChange={handleChangeInput}
                  type="password"
                  maxLength="6"
                  className={`text-black tracking-widest py-1 text-xl sm:text-2xl lg:text-3xl text-center focus:outline-none w-full rounded-md border border-black focus:border-green-500`}
                />
                <button
                  disabled={isLoading ? true : false}
                  type="submit"
                  className={`${
                    isLoading ? "bg-gray-400" : "bg-primary hover:bg-blue-600"
                  } text-white mt-3 text-base lg:text-lg w-full py-2 rounded-md focus:outline-none`}
                >
                  {isLoading ? "Verifying" : "Verify"}
                </button>
              </form>
              <div className="flex justify-center items-center mt-3">
                <span className="text-center text-gray-500 font-medium text-sm">
                  Don't receive verification otp?&nbsp;
                  {!shouldCount ? (
                    <span
                      onClick={() => sendVerificationOtp()}
                      className="text-primary font-semibold cursor-pointer hover:underline hover:text-blue-400"
                    >
                      Resend again
                    </span>
                  ) : (
                    <span className="text-primary font-semibold">
                      wait {countDown < 10 ? "0" + countDown : countDown}{" "}
                      Seconds
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-b-4 border-gray-300 shadow-2xl" />
      </main>
      <style jsx>
        {`
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          /* Firefox */
          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}
      </style>
    </Layout>
  );
}
