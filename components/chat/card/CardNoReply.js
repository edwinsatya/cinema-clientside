import { useState } from "react";
import getTimeChat from "../../../utils/function/getTimeChat";

export default function CardNoReply(props) {
  const { discussion, onDelete } = props;
  const userId = localStorage.getItem("userId");
  const [onHover, setOnHover] = useState(false);

  const handleReply = () => {
    console.log(discussion);
  };

  return (
    <div
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      className="flex text-sm my-2"
    >
      <div className="flex justify-start items-start">
        <div
          className="rounded-md p-3"
          style={{ backgroundColor: discussion.userId.color }}
        >
          <span className="font-bold uppercase text-white leading-relaxed tracking-widest">
            {discussion.userId.name.substr(0, 2)}
          </span>
        </div>
      </div>
      <div className="pl-2 w-full">
        <div className="flex justify-between items-center">
          <span
            className="capitalize"
            style={{ color: discussion.userId.color }}
          >
            {discussion.userId.name}
          </span>
          {onHover ? (
            <div className="flex justify-center items-center">
              <span
                onClick={() => handleReply()}
                className="hover:text-primary"
              >
                Reply
              </span>
              <span
                onClick={() => onDelete(discussion)}
                className={`${
                  discussion.userId._id !== userId ? "hidden" : ""
                } ml-3 hover:text-red-600 cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </span>
            </div>
          ) : (
            <span>{getTimeChat(discussion.updatedAt)}</span>
          )}
        </div>
        <div>
          <span>{discussion.discussion}</span>
        </div>
      </div>
    </div>
  );
}
