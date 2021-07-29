import Image from "next/image";
import RatingStar from "../ratingStar/RatingStar";
import cardStyle from "../../../styles/card.module.css";
import { useState } from "react";

export default function Card(props) {
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
      onClick={() => onHandleClick(dataContent)}
      className={` hover:scale-105 transition-all duration-300 cursor-pointer relative w-44 h-60 sm:w-48 sm:h-64 md:w-52 md:h-72 lg:w-56 lg:h-80 rounded-lg shadow-xl drop-shadow-lg mx-3 my-3 ring-4 ring-black transform dark:ring-gray-900 flex-shrink-0 overflow-hidden`}
    >
      <div className={`relative w-full h-full`}>
        <Image
          src={`${
            dataContent.poster_path
              ? "https://image.tmdb.org/t/p/original" + dataContent.poster_path
              : "https://i.ibb.co/6HwNvXv/coming-soon-reopening-event-retail-sale-design-template-79543bc1062ebb6f9eb55d1bb7994d49-screen.jpg"
          }`}
          layout={"fill"}
          objectFit={"fill"}
          quality={100}
          alt="list"
        />
      </div>
      <div
        className={`absolute bottom-0 w-full ${
          cardHover != indexContent ? "h-16" : "h-20"
        }`}
      >
        <div
          className={`bg-white dark:bg-black w-full h-full ${
            cardHover != indexContent ? "opacity-60" : "opacity-90"
          } absolute`}
        ></div>
        <div className="absolute flex flex-col justify-center items-center h-full py-2 w-full text-center">
          <div>
            <span className="font-bold text-base">
              {dataContent.title
                ? getMinimTitle(dataContent.title)
                : getMinimTitle(dataContent.name)}
            </span>
          </div>
          <div
            className={`${
              cardHover == indexContent ? "flex" : "hidden"
            } w-full items-center justify-around`}
          >
            <RatingStar className="flex" voteAvg={dataContent.vote_average} />
            <span className="font-bold text-base">
              {dataContent.vote_average}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
