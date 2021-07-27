import { useState, useEffect } from "react";
import HeaderChat from "./HeaderChat";
import Discussions from "./Discussions";
import { useRecoilValue } from "recoil";
import { listDiscussion as listDiscussionAtom } from "../../store";

export default function Chat(props) {
  const { countUserOnline } = props;
  const discussions = useRecoilValue(listDiscussionAtom);
  const [showChat, setShowChat] = useState(false);

  if (!showChat) {
    return (
      <div
        onClick={() => setShowChat(!showChat)}
        className="cursor-pointer fixed rounded-md shadow-lg z-50 bottom-4 right-4 text-black bg-white dark:text-white dark:bg-gray-900 p-3"
      >
        <span className="text-base font-bold flex items-center">
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          Chat Cinema21
          <span>
            <div className="h-3 w-3 bg-green-400 mx-1 rounded-full"></div>
          </span>
          <span>{countUserOnline}</span>
        </span>
      </div>
    );
  } else {
    return (
      <div className="fixed rounded-md shadow-lg z-40 bottom-0 right-0 text-black bg-white dark:text-white dark:bg-gray-900 w-full max-w-sm">
        <HeaderChat
          countUserOnline={countUserOnline}
          handleShowChat={() => setShowChat(!showChat)}
        />
        <Discussions discussions={discussions} />
      </div>
    );
  }
}
