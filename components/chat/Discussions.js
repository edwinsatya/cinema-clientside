import "emoji-mart/css/emoji-mart.css";
import CardNoReply from "./card/CardNoReply";
import CardWithReply from "./card/CardWithReply";
import CardReply from "./card/CardReply";
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
  const [isReply, setIsReply] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addEmoji = (e) => {
    let emoji = e.native;
    setInputChat((prev) => prev + emoji);
  };

  const handleInputChange = (e) => {
    setInputChat(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (inputChat) {
        setIsLoading(true);
        let body = {};
        if (!isReply) {
          body = {
            discussion: inputChat,
          };
        } else {
          body = {
            discussion: inputChat,
            replied: isReply._id,
          };
        }
        await cinemaAPI.post("/discussions", body, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setInputChat("");
        setIsLoading(false);
        setIsReply(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    await cinemaAPI.delete(`/discussions/${e._id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  };

  useEffect(() => {
    let elem = document.getElementById("discussions");
    elem.scrollTop = elem.scrollHeight;
  }, [discussions]);

  useEffect(() => {
    if (isReply) {
      document.getElementById("input-chat").focus();
    }
  }, [isReply]);

  return (
    <div id="discussions" className="max-h-96 lg:max-h-97 overflow-y-auto">
      <div
        className={`${
          currentUser ? "hidden" : "absolute"
        } flex justify-center items-center h-full w-full z-50 max-w-sm bg-gray-800  bg-opacity-90`}
      >
        <Link href="/login">
          <a className="font-bold text-xl mb-4 cursor-pointer text-white hover:underline hover:text-primary">
            Sign In
          </a>
        </Link>
      </div>
      {isReply && (
        <CardReply reply={isReply} removeReply={() => setIsReply(null)} />
      )}
      <div className="p-3 flex flex-col mb-12">
        {discussions.length > 0 ? (
          discussions.map((discussion, index) =>
            discussion.replied ? (
              <CardWithReply
                key={index}
                discussion={discussion}
                onDelete={(e) => handleDelete(e)}
                onReply={(e) => setIsReply(e)}
              />
            ) : (
              <CardNoReply
                key={index}
                discussion={discussion}
                onDelete={(e) => handleDelete(e)}
                onReply={(e) => setIsReply(e)}
              />
            )
          )
        ) : (
          <div className="h-36 flex justify-center items-center">
            No Have Discussions
          </div>
        )}
      </div>

      <div className="fixed bottom-0 w-full bg-white dark:bg-gray-900 flex justify-between max-w-sm items-center">
        <div className="w-10/12 relative">
          <form onSubmit={handleSubmit}>
            <input
              disabled={isLoading}
              id="input-chat"
              required
              autoFocus
              type="text"
              onFocus={() => setShowEmoji(false)}
              onChange={handleInputChange}
              value={inputChat}
              className={`${
                isLoading ? " text-gray-600" : "bg-white dark:bg-gray-900"
              } border h-12 dark:border-gray-700 focus:outline-none py-2 pl-2 pr-8 w-full text-black dark:text-white`}
              placeholder="Type a message here"
            />
            <button
              type="button"
              disabled={isLoading}
              className={`${
                !isLoading ? "cursor-pointer" : ""
              }  absolute bottom-3 right-2`}
              onClick={() => setShowEmoji(!showEmoji)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${isLoading ? " text-gray-600" : ""} h-6 w-6`}
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
            </button>
          </form>
        </div>
        <div className="w-2/12 flex justify-around">
          <button
            disabled={isLoading}
            className={`${!isLoading ? "cursor-pointer" : ""}`}
            onClick={handleSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${isLoading ? " text-gray-600" : ""} h-6 w-6`}
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
          </button>
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
