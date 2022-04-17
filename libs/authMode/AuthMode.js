import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
  changeDark,
  changeLight,
  currentUser as currentUserAtom,
  countUserOnline as countUserOnlineAtom,
  listDiscussion as listDiscussionAtom,
  countChatNotRead as countChatNotReadAtom,
  openChat as openChatAtom,
} from "../../store";
import { cinemaAPI } from "../../services/api";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import { io } from "socket.io-client";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const socket = io(publicRuntimeConfig.hostUrl);

const override = css`
  overflow: hidden;
`;

export default function AuthMode(props) {
  const changeThemeToDark = useSetRecoilState(changeDark);
  const changeThemeToLight = useSetRecoilState(changeLight);
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const setCountUserOnline = useSetRecoilState(countUserOnlineAtom);
  const setListDiscussion = useSetRecoilState(listDiscussionAtom);
  const [countChatNotRead, setCountChatNotRead] =
    useRecoilState(countChatNotReadAtom);
  const currentUser = useRecoilValue(currentUserAtom);
  const openChat = useRecoilValue(openChatAtom);
  const router = useRouter();

  // socket.on("updateUserOnline", () => {
  //   getCountUserOnline();
  // });

  // socket.emit("join");

  socket.on("countUserOnline", (total) => {
    getCountUserOnline(total);
  });

  socket.on("newDiscussion", () => {
    if (openChat) {
      setCountChatNotRead(0);
    } else {
      let currentCountChat = countChatNotRead + 1;
      setCountChatNotRead(currentCountChat);
    }
    getDiscussions();
  });

  // const isPublicUrl = (url) => {
  //   let maniUrl = "/";
  //   let countSlash = 0;
  //   let flag = false;
  //   for (let i = 0; i < url.length; i++) {
  //     if (countSlash == 2) {
  //       break;
  //     } else {
  //       if (url[i] == "/") {
  //         countSlash++;
  //       } else {
  //         maniUrl += url[i];
  //       }
  //     }
  //   }
  //   switch (maniUrl) {
  //     case "/login":
  //       flag = true;
  //       break;
  //     case "/register":
  //       flag = true;
  //       break;
  //     case "/verify-email":
  //       flag = true;
  //       break;
  //     case "/":
  //       flag = true;
  //       break;
  //     default:
  //       flag = false;
  //       break;
  //   }
  //   return flag;
  // };

  const getCountUserOnline = (total) => {
    // const response = await cinemaAPI.get("/users/count-user-on");
    // const total = response.data.data.length;
    setCountUserOnline(total);
  };

  const getDiscussions = async () => {
    const response = await cinemaAPI.get("/discussions");
    setListDiscussion(response.data.data);
  };

  useEffect(() => {
    localStorage.removeItem("theme");

    // if (localStorage.getItem("token")) {
    //   setCurrentUser(localStorage.getItem("token"));
    //   if (
    //     router.asPath === "/login" ||
    //     router.asPath === "/register" ||
    //     router.asPath === "/login/verify-otp"
    //   ) {
    //     router.replace("/");
    //   }
    // } else {
    //   setCurrentUser("");
    //   if (!isPublicUrl(router.asPath)) {
    //     router.replace("/login");
    //   }
    // }

    if (localStorage.getItem("name")) {
      setCurrentUser(localStorage.getItem("name"));
    } else {
      setCurrentUser("");
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

    getCountUserOnline();
    getDiscussions();
  }, []);

  // if (
  //   currentUser &&
  //   (router.asPath === "/login" || router.asPath === "/register")
  // ) {
  //   return (
  //     <div className="flex justify-center items-center h-screen w-full bg-white">
  //       <HashLoader
  //         color={`#177EE2`}
  //         loading={true}
  //         css={override}
  //         size={150}
  //       />
  //     </div>
  //   );
  // }

  // if (!currentUser && !isPublicUrl(router.asPath)) {
  //   return (
  //     <div className="flex justify-center items-center h-screen w-full bg-white">
  //       <HashLoader
  //         color={`#177ee2`}
  //         loading={true}
  //         css={override}
  //         size={100}
  //       />
  //     </div>
  //   );
  // }
  return <div>{props.children}</div>;
}
