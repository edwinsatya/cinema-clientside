import { useState } from "react/cjs/react.development";

export default function CardAnyTrailer(props) {
  const { indexTrailer, videoKey, onClick } = props;
  const [mouseHover, setMouseHover] = useState(false);

  return (
    <div className="relative w-60 h-36 sm:w-64 sm:h-40 md:w-72 md:h-44 lg:w-80 lg:h-48 rounded-lg shadow-xl drop-shadow-lg mx-3 my-2 ring-4 ring-black transform dark:ring-gray-900 flex-shrink-0 overflow-hidden">
      <div
        onClick={() => onClick(indexTrailer)}
        onMouseEnter={() => setMouseHover(true)}
        onMouseLeave={() => setMouseHover(false)}
        className={`absolute flex justify-center items-center cursor-pointer transform transition-all top-0 left-0 w-full h-full z-50`}
      >
        <div
          className={`${
            !mouseHover ? "hidden" : ""
          }bg-blue-600 w-20 h-12 flex justify-center items-center rounded-xl`}
        >
          <div
            className="h-0 w-0"
            style={{
              borderTop: "13px solid transparent",
              borderLeft: "20px solid white",
              borderBottom: "13px solid transparent",
            }}
          ></div>
        </div>
      </div>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoKey}?rel=0&disablekb=1&modestbranding=1&showinfo=0&controls=0&autohide=1`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}
