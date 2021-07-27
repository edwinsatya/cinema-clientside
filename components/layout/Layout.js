import Head from "next/head";
import Chat from "../chat/Chat";
import Footer from "../footer/Footer";
import { useRouter } from "next/router";
import { countUserOnline as currentUserOnlineAtom } from "../../store";
import { useRecoilValue } from "recoil";

export default function Layout(props) {
  const router = useRouter();
  const countUserOnline = useRecoilValue(currentUserOnlineAtom);

  const checkPath = (path) => {
    let flag = true;
    let countSlash = 0;
    let maniPath = "";
    for (let i = 0; i < path.length; i++) {
      if (path[i] === "/") {
        countSlash++;
      }
      if (countSlash < 2) {
        maniPath += path[i];
      } else {
        break;
      }
    }

    switch (maniPath) {
      case "/login":
        flag = false;
        break;
      case "/register":
        flag = false;
        break;
      case "/verify-email":
        flag = false;
        break;
      default:
        flag = true;
        break;
    }
    return flag;
  };
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {checkPath(router.asPath) ? (
        <Chat countUserOnline={countUserOnline} />
      ) : (
        ""
      )}

      <div>{props.children}</div>

      <Footer />
    </>
  );
}
