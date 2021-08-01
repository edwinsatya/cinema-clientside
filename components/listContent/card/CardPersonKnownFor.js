import Image from "next/image";
import { useState } from "react";

export default function CardPersonKnownFor(props) {
  const { dataContent, onHandleClick, indexContent } = props;
  const [onHover, setOnHover] = useState(false);
  return (
    <div
      onClick={() => onHandleClick(dataContent)}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      className={`cursor-pointer relative ${
        indexContent > 0 ? "ml-3" : ""
      } my-3 flex-shrink-0`}
    >
      <div
        className={`transform hover:scale-105 transition-all duration-300 relative w-24 h-40 sm:w-28 sm:h-44 md:w-32 md:h-48 lg:w-36 lg:h-52 rounded-lg overflow-hidden shadow-xl`}
      >
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
        className={`relative text-center text-sm my-1 w-24 sm:w-28 md:w-32 lg:w-36 ${
          onHover ? "text-primary" : ""
        }`}
      >
        {dataContent.title || dataContent.name || "-"}
      </div>
    </div>
  );
}
