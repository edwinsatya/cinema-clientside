export default function CardReply(props) {
  const { reply, removeReply } = props;
  return (
    <div
      className={`fixed rounded-sm overflow-hidden w-36 z-50 bottom-12 bg-gray-400 dark:bg-gray-800`}
    >
      <div
        className="relative border-l-4 p-1 flex flex-col"
        style={{ borderColor: reply.userId.color }}
      >
        <div
          onClick={() => removeReply()}
          className="absolute cursor-pointer h-4 w-4 top-0 bg-gray-300 dark:bg-gray-500 right-0"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex justify-start items-center">
          <span
            className="capitalize text-sm font-bold"
            style={{ color: reply.userId.color }}
          >
            {reply.userId.name.length <= 12
              ? reply.userId.name
              : reply.userId.name.substr(0, 12) + ".."}
          </span>
        </div>
        <div className="text-sm">
          <span>
            {reply.discussion.length < 16
              ? reply.discussion
              : reply.discussion.substr(0, 15) + "..."}
          </span>
        </div>
      </div>
    </div>
  );
}
