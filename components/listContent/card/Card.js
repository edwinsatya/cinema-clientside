import Image from "next/image";
import IconFire from "../../icons/IconFire";
import cardStyle from "../../../styles/card.module.css";
import { useState } from "react";

export default function Card(props) {
  const { dataContent, indexContent, onHandleClick } = props;

  const [cardHover, setCardHover] = useState(null);

  const countRating = (e) => {
    const rating = Math.floor(e);
    const arr = [false, false, false, false, false];
    switch (rating) {
      case 1:
      case 2:
        arr.fill(true, 0, 1);
        break;
      case 3:
      case 4:
        arr.fill(true, 0, 2);
        break;
      case 5:
      case 6:
        arr.fill(true, 0, 3);
        break;
      case 7:
      case 8:
        arr.fill(true, 0, 4);
        break;
      case 9:
      case 10:
        arr.fill(true, 0, 5);
        break;
      default:
        arr.fill(true, 0, 0);
        break;
    }
    return arr;
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
        />
      </div>
      <div
        className={`absolute bottom-0 w-full ${
          cardHover != indexContent ? "h-10" : "h-20"
        }`}
      >
        <div className="bg-white dark:bg-black w-full h-full opacity-60 absolute"></div>
        <div className="absolute flex flex-col justify-center items-center h-full py-2 w-full text-center">
          <div>
            <span className="font-bold text-base">
              {dataContent.title ? dataContent.title : dataContent.name}
            </span>
          </div>
          <div
            className={`${
              cardHover == indexContent ? "flex" : "hidden"
            } w-full items-center justify-around`}
          >
            <span className="flex">
              {countRating(dataContent.vote_average).map((fire, index) => {
                return (
                  <IconFire
                    key={index}
                    className={`${fire ? "text-yellow-300" : "text-gray-500"}`}
                  />
                );
              })}
            </span>
            <span className="font-bold text-base">
              {dataContent.vote_average}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
