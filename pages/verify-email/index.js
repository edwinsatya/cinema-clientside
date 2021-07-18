import Layout from "../../components/layout/Layout";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { cinemaAPI } from "../../services/api";
import ScaleLoader from "react-spinners/ScaleLoader";

const override = css`
  overflow: hidden;
`;

export default function VerifyEmail() {
  const [popUpMsg, setPopUpMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("tokenVerification");
    const verifyEmail = async () => {
      try {
        const response = await cinemaAPI.patch(
          `/users/verification-email`,
          null,
          {
            headers: {
              token,
            },
          }
        );
        localStorage.removeItem("tokenVerification");
        localStorage.removeItem("currentRegisterId");
        setTimeout(() => {
          setPopUpMsg(response.data.message);
        }, 3500);
        setTimeout(() => {
          window.close();
        }, 6000);
      } catch (error) {
        localStorage.removeItem("tokenVerification");
        localStorage.removeItem("currentRegisterId");
        setTimeout(() => {
          setPopUpMsg(error.response.data.errors.message);
        }, 3500);
        setTimeout(() => {
          window.close();
        }, 6000);
      }
    };
    verifyEmail();
  }, []);

  return (
    <Layout title="verify email">
      <div className="h-screen w-full bg-white">
        <div className="flex justify-center items-center h-full w-full bg-black bg-opacity-80">
          <div
            className={`${
              popUpMsg ? "flex" : "hidden"
            } absolute border border-gray-400 rounded-lg bg-opacity-95 flex-col justify-center items-center z-40 bg-white h-1/3 w-full max-w-lg`}
          >
            <span className="text-primary text-center text-xl">{popUpMsg}</span>
          </div>
          <ScaleLoader
            color={`#177EE2`}
            loading={true}
            css={override}
            size={150}
          />
        </div>
      </div>
    </Layout>
  );
}
