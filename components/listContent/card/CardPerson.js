import Image from "next/image";
import { useState } from "react";

export default function CardPerson(props) {
  const { dataContent, indexContent, onHandleClick } = props;

  const [cardHover, setCardHover] = useState(null);

  return (
    <div className="flex flex-col">
      <div
        onMouseOver={() => setCardHover(indexContent)}
        onMouseOut={() => setCardHover(null)}
        onClick={() => onHandleClick(dataContent)}
        className={`transition-all duration-300 ${
          indexContent % 2 == 0 ? "rotate-6" : "-rotate-6"
        } hover:rotate-0 cursor-pointer relative w-44 h-60 sm:w-48 sm:h-64 md:w-52 md:h-72 lg:w-56 lg:h-80 rounded-lg shadow-xl drop-shadow-lg mx-3 my-4 ring-4 ring-black transform dark:ring-gray-900 flex-shrink-0 overflow-hidden`}
      >
        <div className={`relative w-full h-full`}>
          <Image
            src={`${
              dataContent.profile_path
                ? "https://image.tmdb.org/t/p/original" +
                  dataContent.profile_path
                : "https://i.ibb.co/6HwNvXv/coming-soon-reopening-event-retail-sale-design-template-79543bc1062ebb6f9eb55d1bb7994d49-screen.jpg"
            }`}
            layout={"fill"}
            objectFit={"fill"}
            quality={100}
            alt="list"
          />
        </div>
      </div>
      <div
        className={`transform transition-all duration-300 ${
          cardHover === indexContent ? "h-16" : "h-0"
        } text-center ${
          cardHover === indexContent
            ? "flex justify-center items-center border-b-2 rounded-b-md border-primary"
            : "visible opacity-0"
        }`}
      >
        <span
          className={`${
            cardHover === indexContent ? "" : "h-0"
          } font-bold text-base`}
        >
          {dataContent.name}
        </span>
      </div>
    </div>
  );
}
