import "emoji-mart/css/emoji-mart.css";
import CardNoReply from "./card/CardNoReply";
import CardWithReply from "./card/CardWithReply";
import { Picker } from "emoji-mart";
import { useEffect, useState } from "react";
import { cinemaAPI } from "../../services/api";
import { useRecoilValue } from "recoil";
import { currentUser as currentUserAtom } from "../../store";
import Link from "next/link";

export default function Discussions(props) {
  const { discussions } = props;
  const currentUser = useRecoilValue(currentUserAtom);
  const [showEmoji, setShowEmoji] = useState(false);
  const [inputChat, setInputChat] = useState("");

  const addEmoji = (e) => {
    let emoji = e.native;
    setInputChat((prev) => prev + emoji);
  };

  const handleInputChange = (e) => {
    setInputChat(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputChat) {
      const body = {
        discussion: inputChat,
      };
      await cinemaAPI.post("/discussions", body, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setInputChat("");
    }
  };

  useEffect(() => {
    let elem = document.getElementById("discussions");
    elem.scrollTop = elem.scrollHeight;
  }, [discussions]);

  return (
    <div id="discussions" className="max-h-96 overflow-y-auto">
      <div
        className={`${
          currentUser ? "hidden" : "absolute"
        } flex justify-center items-center h-full w-full z-50 max-w-sm bg-gray-800  bg-opacity-90`}
      >
        <Link href="/login">
          <a className="font-bold text-xl cursor-pointer text-white hover:underline hover:text-primary">
            Login
          </a>
        </Link>
      </div>
      <div className="p-3 flex flex-col mb-12">
        {discussions.map((discussion, index) =>
          discussion.replied ? (
            <CardWithReply key={index} discussion={discussion} />
          ) : (
            <CardNoReply key={index} discussion={discussion} />
          )
        )}

        {/* <div className="flex text-sm">
          <div className="flex justify-start items-start">
            <div className="rounded-md p-3 bg-green-400">
              <span className="font-bold leading-relaxed tracking-widest">
                ES
              </span>
            </div>
          </div>
          <div className="pl-2 flex flex-col">
            <div className="flex justify-between items-center">
              <span>Edwin Satya Yudistira</span>
              <span>9:53 am</span>
            </div>
            <div className="my-2 border-l-4 p-2 border-red-500 flex flex-col">
              <div className="flex justify-start items-center">
                <span>Edwin Satya Yudistira</span>
                <span className="ml-2">9:53 am</span>
              </div>
              <div className="py-2">
                <span>
                  Lorem2 ipsum dolor sit amet consectetur adipisicing elit.
                  Mollitia, rerum Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Maxime officiis corrupti dolore, corporis
                  distinctio sunt eaque quasi? Temporibus, sunt tempora.
                </span>
              </div>
            </div>
            <div>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia, rerum Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Maxime officiis corrupti dolore, corporis
                distinctio sunt eaque quasi? Temporibus, sunt tempora.
              </span>
            </div>
          </div>
        </div> */}
      </div>

      <div className="fixed bottom-0 w-full bg-white dark:bg-gray-900 flex justify-between max-w-sm items-center">
        <div className="w-10/12 relative">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onFocus={() => setShowEmoji(false)}
              onChange={handleInputChange}
              value={inputChat}
              className="border h-12 dark:border-gray-700 focus:outline-none py-2 pl-2 pr-8 w-full bg-white dark:bg-gray-900 text-black dark:text-white"
              placeholder="Type a message here"
            />
            <span
              className="cursor-pointer absolute bottom-3 right-2"
              onClick={() => setShowEmoji(!showEmoji)}
            >
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
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </form>
        </div>
        <div className="w-2/12 flex justify-around">
          <span className="cursor-pointer" onClick={handleSubmit}>
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          {showEmoji && (
            <span className="absolute bottom-10 right-0">
              <Picker onSelect={addEmoji} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
