import LogoText from "../icons/LogoText";

export default function HeaderChat(props) {
  const { countUserOnline, handleShowChat } = props;
  return (
    <div className="flex items-center justify-center border-b dark:border-gray-700 p-3">
      <div className="w-1/2 flex items-center">
        <span className="text-base font-bold">
          <LogoText />
        </span>
      </div>
      <div className="w-1/2 flex justify-end items-center">
        <span>
          <div className="h-3 w-3 bg-green-500 mx-1 rounded-full"></div>
        </span>
        <span>{countUserOnline}</span>
        <span onClick={() => handleShowChat()} className="ml-3 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 font-bold"
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
        </span>
      </div>
    </div>
  );
}
