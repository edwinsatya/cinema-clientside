import Image from "next/image";
import IconFire from "../../icons/IconFire";
import cardStyle from "../../../styles/card.module.css";
import { useState } from "react";

export default function Card(props) {
  const { dataContent, indexContent, onHandleClick } = props;
  const countRating = (e) => {
    const rating = Math.round(e);
    const arr = [];
    switch (rating) {
      case 1 || 2:
        for (let i = 0; i < 1; i++) {
          arr.push({});
        }
        break;
      case 3 || 4:
        for (let i = 0; i < 2; i++) {
          arr.push({});
        }
        break;
      case 5 || 6:
        for (let i = 0; i < 3; i++) {
          arr.push({});
        }
        break;
      case 7 || 8:
        for (let i = 0; i < 4; i++) {
          arr.push({});
        }
        break;
      case 9 || 10:
        for (let i = 0; i < 5; i++) {
          arr.push({});
        }
        break;
      default:
        arr.push({});
        break;
    }
    return arr;
  };
  const [cardHover, setCardHover] = useState(null);

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
              ? dataContent.poster_path
              : dataContent.backdrop_path
          }
          layout={"fill"}
          objectFit={"fill"}
          quality={100}
          alt="list"
        />
      </div>
      <div className="absolute bottom-0 w-full h-10">
        <div className="bg-white dark:bg-black w-full h-full opacity-60 absolute"></div>
        <div className="absolute flex justify-around items-center h-full py-2 w-full text-center">
          <span>
            {dataContent.original_title ? dataContent.title : dataContent.name}
          </span>
          <span className="flex">
            {countRating(dataContent.vote_average).map((fire, index) => {
              return (
                <IconFire
                  key={index}
                  className={`${
                    countRating(dataContent.vote_average).length == 1
                      ? "text-red-500"
                      : countRating(dataContent.vote_average).length == 2
                      ? "text-green-500"
                      : countRating(dataContent.vote_average).length == 3
                      ? "text-blue-500"
                      : countRating(dataContent.vote_average).length == 4
                      ? "text-yellow-300"
                      : countRating(dataContent.vote_average).length == 5
                      ? "text-yellow-700"
                      : "text-black"
                  }`}
                />
              );
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
