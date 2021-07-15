import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  changeDark,
  changeLight,
  currentUser as currentUserAtom,
} from "../../store";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function AuthMode(props) {
  const changeThemeToDark = useSetRecoilState(changeDark);
  const changeThemeToLight = useSetRecoilState(changeLight);
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const currentUser = useRecoilValue(currentUserAtom);
  const router = useRouter();

  const isPublicUrl = (url) => {
    let maniUrl = "/";
    let countSlash = 0;
    let flag = false;
    for (let i = 0; i < url.length; i++) {
      if (countSlash == 2) {
        break;
      } else {
        if (url[i] == "/") {
          countSlash++;
        } else {
          maniUrl += url[i];
        }
      }
    }
    switch (maniUrl) {
      case "/":
        flag = true;
        break;
      case "/login":
        flag = true;
        break;
      case "/register":
        flag = true;
        break;
      default:
        flag = false;
        break;
    }
    return flag;
  };

  useEffect(() => {
    localStorage.removeItem("theme");

    if (localStorage.getItem("token")) {
      setCurrentUser(localStorage.getItem("token"));
      if (router.asPath === "/login" || router.asPath === "/register") {
        router.replace("/");
      }
    } else {
      setCurrentUser("");
      if (!isPublicUrl(router.asPath)) {
        router.replace("/login");
      }
    }

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      changeThemeToDark();
    } else {
      document.documentElement.classList.remove("dark");
      changeThemeToLight();
    }
  }, []);

  if (
    currentUser &&
    (router.asPath === "/login" || router.asPath === "/register")
  ) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-800">
        <HashLoader color={`177EE2`} loading={true} css={override} size={150} />
      </div>
    );
  }

  if (!currentUser && !isPublicUrl(router.asPath)) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-800">
        <HashLoader color={`177EE2`} loading={true} css={override} size={150} />
      </div>
    );
  }
  return <div>{props.children}</div>;
}
