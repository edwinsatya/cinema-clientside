import Image from "next/image";
import { useState } from "react";

export default function CardSeasons(props) {
  const { dataContent, indexContent, onHandleClick } = props;

  const [cardHover, setCardHover] = useState(null);

  const getMinimTitle = (title) => {
    const lengthTitle = title.length;
    if (lengthTitle > 28) {
      return `${title.substr(0, 28)}...`;
    }
    return title;
  };

  return (
    <div
      onMouseOver={() => setCardHover(indexContent)}
      onMouseOut={() => setCardHover(null)}
      // onClick={() => onHandleClick(dataContent)}
      className={`cursor-pointer hover:scale-105 transition-all duration-300 relative w-36 h-52 sm:w-40 sm:h-56 md:w-44 md:h-60 lg:w-48 lg:h-64 rounded-lg shadow-xl drop-shadow-lg mx-3 my-3 ring-4 ring-black transform dark:ring-gray-900 flex-shrink-0 overflow-hidden`}
    >
      <div className={`relative w-full h-full`}>
        <Image
          src={
            dataContent.poster_path
              ? "https://image.tmdb.org/t/p/original" + dataContent.poster_path
              : "https://i.ibb.co/6HwNvXv/coming-soon-reopening-event-retail-sale-design-template-79543bc1062ebb6f9eb55d1bb7994d49-screen.jpg"
          }
          layout={"fill"}
          objectFit={"fill"}
          quality={100}
          alt="list"
        />
      </div>
      <div
        className={`absolute bottom-0 w-full h-20  ${
          cardHover == indexContent ? "flex" : "hidden"
        }`}
      >
        <div className="bg-white dark:bg-black bg-opacity-90 w-full h-full absolute"></div>
        <div className="absolute flex flex-col justify-center items-center h-full py-2 w-full text-center">
          <div>
            <span
              className={`font-bold text-base ${
                dataContent.name.toLowerCase() === "specials"
                  ? "text-red-600"
                  : "text-primary"
              }`}
            >
              {dataContent.title
                ? getMinimTitle(dataContent.title)
                : getMinimTitle(dataContent.name)}
            </span>
          </div>
          <div className={`flex w-full items-center justify-around`}>
            <span className="font-bold text-base">
              Total Episode {dataContent.episode_count}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
