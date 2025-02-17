import { css } from "@emotion/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ClockLoader from "react-spinners/ClockLoader";
import MoonLoader from "react-spinners/MoonLoader";
import ButtonLogo from "../../components/buttons/ButtonLogo";
import Layout from "../../components/layout/Layout";
// import { io } from "socket.io-client";
import { useRouter } from "next/router";
import { cinemaAPI } from "../../services/api";
// import getConfig from "next/config";
// const { publicRuntimeConfig } = getConfig();

// const socket = io(publicRuntimeConfig.hostUrl);

const override = css`
  overflow: hidden;
`;

export async function getServerSideProps(context) {
  const registerId = context.params.registerId;
  try {
    const detailRegister = await cinemaAPI(`/users/register/${registerId}`);
    return {
      props: {
        detailRegister: detailRegister.data.data,
        isError: false,
      },
    };
  } catch (error) {
    return {
      props: {
        detailRegister: {
          name: "-",
          email: "-",
          errMsg: error.response.data.errors.message,
        },
        isError: true,
      },
    };
  }
}

export default function SuccessRegister(props) {
  const { detailRegister, isError } = props;
  const router = useRouter();
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMsg, setPopUpMsg] = useState("");
  const [countDown, setCountDown] = useState(60);
  const [shouldCount, setShouldCount] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // socket.on("emailVerified", (data) => {
  //   if (data.id == detailRegister.id) {
  //     if (data.isVerify) {
  //       localStorage.removeItem("tokenVerification");
  //       clearInterval(intervalId);
  //       setCountDown(60);
  //       setTimeout(() => {
  //         router.replace("/login");
  //       }, 500);
  //     } else {
  //       localStorage.removeItem("tokenVerification");
  //       setTimeout(() => {
  //         clearInterval(intervalId);
  //         setCountDown(60);
  //         setTimeout(() => {
  //           router.replace("/register");
  //         }, 500);
  //       }, 5000);
  //     }
  //   }
  // });

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown]);

  const sendVerificationEmail = async () => {
    try {
      setShowPopUp(true);
      const token = localStorage.getItem("tokenVerification");
      await cinemaAPI.post(`/users/send-email`, null, {
        headers: {
          token,
        },
      });
      setShouldCount(true);
      setTimeout(() => {
        setIsSendEmail(true);
      }, 2500);
      setPopUpMsg("Email has been sent");
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
          localStorage.removeItem("tokenVerification");
          clearInterval(intervalId);
          setCountDown(60);
          setTimeout(() => {
            router.replace("/register");
          }, 500);
        }
      }, 5000);
    }
  };

  useEffect(() => {
    if (isError) {
      setShowPopUp(true);
      setTimeout(() => {
        setIsSendEmail(true);
      }, 2500);
      setPopUpMsg(detailRegister.errMsg);
      setTimeout(() => {
        localStorage.removeItem("tokenVerification");
        setShowPopUp(false);
        setIsSendEmail(false);
        setPopUpMsg("");
        router.replace("/register");
      }, 5000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <Layout title="Success Register">
      <header className="sticky top-0 z-50">
        <div className="relative flex items-center justify-between p-4 bg-white border-b border-gray-200 md:px-8 lg:px-12">
          <div className="w-2/12">
            <Link href="/" passHref>
              <ButtonLogo />
            </Link>
          </div>
          <div>
            <Link href="/login">
              <a className="text-sm leading-relaxed cursor-pointer sm:p-2 sm:text-base lg:text-2xl font-base hover:underline">
                Sign In
              </a>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div className="relative flex items-center justify-center w-full h-screen bg-gray-100">
          <div
            className={`${
              showPopUp ? "flex" : "hidden"
            } absolute border border-gray-400 rounded-lg bg-opacity-95 flex-col justify-center items-center z-40 bg-white h-1/3 w-full max-w-lg`}
          >
            {!isSendEmail ? (
              <MoonLoader
                color={`#177ee2`}
                loading={true}
                css={override}
                size={120}
              />
            ) : (
              <span className="text-xl text-center text-primary">
                {popUpMsg}
              </span>
            )}
          </div>
          <div className="flex flex-col items-center justify-center lg:max-w-xl">
            <ClockLoader
              color={`#177ee2`}
              loading={true}
              css={override}
              size={120}
            />
            <div className="flex flex-col items-center justify-center mt-5">
              <span className="text-2xl font-bold text-gray-500 lg:text-3xl">
                Verify your email
              </span>
              <span className="px-4 mt-5 text-left md:text-center">
                Hai{" "}
                <span className="capitalize text-primary">
                  {detailRegister.name || "-"},&nbsp;
                </span>
                <span>
                  We sent an email to&nbsp;
                  <span className="text-primary">
                    {detailRegister.email || "-"}&nbsp;
                  </span>
                  to verify your email address and active your account. Your
                  email will be expire in 24 hours,
                </span>
              </span>
              <span className="px-4 mt-3 text-left md:text-center">
                If your account has been active, this page automatic redirect to
                Login Page.&nbsp; If you did not receive an email&nbsp;
                {!shouldCount ? (
                  <span
                    onClick={() => sendVerificationEmail()}
                    className="font-semibold cursor-pointer text-primary hover:underline hover:text-blue-400"
                  >
                    Click Here
                  </span>
                ) : (
                  <span className="font-semibold text-primary">
                    wait {countDown < 10 ? "0" + countDown : countDown} Seconds
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
        <hr className="border-b-4 border-gray-300 shadow-2xl" />
      </main>
    </Layout>
  );
}
