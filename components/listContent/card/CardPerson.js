import Image from "next/image";
import { useEffect, useState } from "react";

export default function CardPerson(props) {
  const { dataContent, indexContent } = props;

  const [cardHover, setCardHover] = useState(null);

  return (
    <div className="flex flex-col">
      <div
        onMouseOver={() => setCardHover(indexContent)}
        onMouseOut={() => setCardHover(null)}
        className={`transition-all duration-300 ${
          indexContent % 2 == 0 ? "rotate-6" : "-rotate-6"
        } hover:rotate-0 cursor-pointer relative w-64 h-80 rounded-lg shadow-xl drop-shadow-lg mx-3 my-2 ring-4 ring-black transform dark:ring-gray-900 flex-shrink-0 overflow-hidden`}
      >
        <div className={`relative w-full h-full`}>
          <Image
            src={dataContent.profile_path}
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
            ? "flex justify-center items-center border-b-2 rounded-b-md border-primary shadow-lg"
            : "visible opacity-0"
        }`}
      >
        <span className={`${cardHover === indexContent ? "" : "h-0"}`}>
          {dataContent.name}
        </span>
      </div>
    </div>
  );
}
