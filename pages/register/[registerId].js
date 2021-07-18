import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import ButtonLogo from "../../components/buttons/ButtonLogo";
import Link from "next/link";
import ClockLoader from "react-spinners/ClockLoader";
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";
import { io } from "socket.io-client";
import { useRouter } from "next/router";
import { cinemaAPI } from "../../services/api";

const socket = io("http://localhost:3100");

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
  const { detailRegister, errDetailRegister, isError } = props;
  const router = useRouter();
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMsg, setPopUpMsg] = useState("");

  socket.on("emailVerified", (data) => {
    if (data.id == detailRegister.id) {
      router.replace("/login");
    }
  });

  const sendVerificationEmail = async () => {
    try {
      setShowPopUp(true);
      const token = localStorage.getItem("tokenVerification");
      await cinemaAPI.post(`/users/send-email`, null, {
        headers: {
          token,
        },
      });
      setTimeout(() => {
        setIsSendEmail(true);
      }, 2500);
      setPopUpMsg("Email has been sent");
      setTimeout(() => {
        setShowPopUp(false);
        setIsSendEmail(false);
      }, 5000);
    } catch (error) {
      setTimeout(() => {
        setIsSendEmail(true);
      }, 2500);
      setPopUpMsg(error.response.data.errors.message);
      setTimeout(() => {
        setShowPopUp(false);
        setIsSendEmail(false);
        setPopUpMsg("");
        router.replace("/register");
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
        setShowPopUp(false);
        setIsSendEmail(false);
        setPopUpMsg("");
        router.replace("/register");
      }, 5000);
    }
  }, [isError]);

  return (
    <Layout title="Success Register">
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
                css={override}
                size={120}
              />
            ) : (
              <span className="text-primary text-center text-xl">
                {popUpMsg}
              </span>
            )}
          </div>
          <div className="flex flex-col lg:max-w-xl justify-center items-center">
            <ClockLoader
              color={`#177ee2`}
              loading={true}
              css={override}
              size={120}
            />
            <div className="mt-5 flex flex-col justify-center items-center">
              <span className="text-gray-500 font-bold text-2xl lg:text-3xl">
                Verify your email
              </span>
              <span className="text-left md:text-center mt-5 px-4">
                Hai{" "}
                <span className="capitalize text-primary">
                  {detailRegister.name || "-"},&nbsp;
                </span>
                <span>
                  We sent an email to&nbsp;
                  <span className="text-primary">
                    {detailRegister.email || "-"}&nbsp;
                  </span>
                  to verify your email address and active your account. The link
                  in the email expire in 24 hours,
                </span>
              </span>
              <span className="text-left md:text-center mt-3 px-4">
                If your account has been active, this page automatic redirect to
                Login Page.&nbsp;
                <span
                  onClick={() => sendVerificationEmail()}
                  className="text-primary font-semibold cursor-pointer hover:underline hover:text-blue-400"
                >
                  Click Here&nbsp;
                </span>
                if you did not receive an email
              </span>
            </div>
          </div>
        </div>
        <hr className="border-b-4 border-gray-300 shadow-2xl" />
      </main>
    </Layout>
  );
}
