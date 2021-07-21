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
      className={`${cardStyle.card} cursor-pointer relative w-80 h-48 rounded-lg shadow-xl drop-shadow-lg mx-3 my-2 ring-4 ring-black transform dark:ring-gray-900 flex-shrink-0 overflow-hidden`}
    >
      <div className={`${cardStyle.imageContent} relative w-full h-full`}>
        <Image
          src={
            cardHover == indexContent
              ? `${
                  dataContent.poster_path
                    ? "https://image.tmdb.org/t/p/original" +
                      dataContent.poster_path
                    : "https://i.ibb.co/6HwNvXv/coming-soon-reopening-event-retail-sale-design-template-79543bc1062ebb6f9eb55d1bb7994d49-screen.jpg"
                }`
              : `${
                  dataContent.backdrop_path
                    ? "https://image.tmdb.org/t/p/original" +
                      dataContent.backdrop_path
                    : "https://i.ibb.co/9spxhL0/2588754.jpg"
                }`
          }
          layout={"fill"}
          objectFit={"fill"}
          quality={100}
          alt="list"
          priority={true}
        />
      </div>
      <div
        className={`absolute bottom-0 w-full ${
          cardHover != indexContent ? "h-10" : "h-20"
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
