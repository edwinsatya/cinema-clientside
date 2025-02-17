import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  countChatNotRead as countChatNotReadAtom,
  listDiscussion as listDiscussionAtom,
  openChat as openChatAtom,
} from "../../store";
import LogoText from "../icons/LogoText";
import Discussions from "./Discussions";
import HeaderChat from "./HeaderChat";

export default function Chat(props) {
  const { countUserOnline } = props;
  const discussions = useRecoilValue(listDiscussionAtom);
  const [countChatNotRead, setCountChatNotRead] =
    useRecoilState(countChatNotReadAtom);
  const [showChat, setShowChat] = useState(false);
  const setOpenChat = useSetRecoilState(openChatAtom);

  const handleOpenChat = () => {
    setShowChat(!showChat);
    setCountChatNotRead(0);
  };

  useEffect(() => {
    setOpenChat(showChat);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showChat]);

  if (!showChat) {
    return (
      <div
        onClick={() => handleOpenChat()}
        className="fixed z-50 p-3 text-black bg-white rounded-md shadow-lg cursor-pointer bottom-2 right-2 md:bottom-3 md:right-3 lg:bottom-4 lg:right-4 dark:text-white dark:bg-gray-900"
      >
        <span className="flex items-center text-base font-bold">
          <span
            className={`${
              countChatNotRead ? "flex" : "hidden"
            } items-center justify-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <span>{countChatNotRead}</span>
          </span>
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
          </span>
          <span>
            <LogoText />
          </span>
          &nbsp;<span className="text-sm">Live Chat</span>
          <span>
            <div className="w-3 h-3 mx-1 bg-green-500 rounded-full"></div>
          </span>
          <span>{countUserOnline}</span>
        </span>
      </div>
    );
  } else {
    return (
      <div className="fixed bottom-0 right-0 z-50 w-full max-w-sm text-black bg-white rounded-none shadow-lg sm:rounded-md dark:text-white dark:bg-gray-900">
        <HeaderChat
          countUserOnline={countUserOnline}
          handleShowChat={() => setShowChat(!showChat)}
        />
        <Discussions discussions={discussions} />
      </div>
    );
  }
}
