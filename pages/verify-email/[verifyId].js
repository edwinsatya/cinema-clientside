import Layout from "../../components/layout/Layout";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { cinemaAPI } from "../../services/api";
import ScaleLoader from "react-spinners/ScaleLoader";

const override = css`
  overflow: hidden;
`;

export async function getServerSideProps(context) {
  const verifyId = context.params.verifyId;
  try {
    const response = await cinemaAPI.patch(
      `/users/verification-email/${verifyId}`
    );
    return {
      props: {
        popUpMsg: response.data.message,
      },
    };
  } catch (error) {
    return {
      props: {
        popUpMsg: error.response.data.errors.message,
      },
    };
  }
}

export default function VerifyEmail(props) {
  const { popUpMsg } = props;
  // const [popUpMsg, setPopUpMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();
  // const userId = router.query.verifyId;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    setTimeout(() => {
      window.close();
    }, 6000);
  }, []);

  // useEffect(() => {
  //   const verifyEmail = async () => {
  //     try {
  //       console.log(userId, "userid nya");
  //       const response = await cinemaAPI.patch(
  //         `/users/verification-email/${userId}`
  //       );
  //       setTimeout(() => {
  //         setPopUpMsg(response.data.message);
  //       }, 3500);
  //       setTimeout(() => {
  //         window.close();
  //       }, 6000);
  //     } catch (error) {
  //       setTimeout(() => {
  //         setPopUpMsg(error.response.data.errors.message);
  //       }, 3500);
  //       // setTimeout(() => {
  //       //   window.close();
  //       // }, 6000);
  //     }
  //   };
  //   verifyEmail();
  // }, []);

  return (
    <Layout title="verify email">
      <div className="h-screen w-full bg-white">
        <div className="flex justify-center items-center h-full w-full bg-black bg-opacity-80">
          <div
            className={`${
              !isLoading ? "flex" : "hidden"
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
