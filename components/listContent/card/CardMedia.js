import Image from "next/image";

export default function CardMedia(props) {
  const { dataContent, media } = props;

  const classMediaBackdrops = "w-97 h-56 sm:h-60 md:h-64 lg:h-72";
  const classMediaPosters =
    "w-44 h-56 sm:w-48 sm:h-60 md:w-52 md:h-64 lg:w-56 lg:h-72";
  return (
    <div
      className={`${
        media === "backdrops" ? classMediaBackdrops : classMediaPosters
      } relative flex-shrink-0 overflow-hidden`}
    >
      <div className={`relative w-full h-full`}>
        <Image
          src={`${
            dataContent.file_path
              ? "https://image.tmdb.org/t/p/original" + dataContent.file_path
              : media === "backdrops"
              ? "https://i.ibb.co/9spxhL0/2588754.jpg"
              : "https://i.ibb.co/6HwNvXv/coming-soon-reopening-event-retail-sale-design-template-79543bc1062ebb6f9eb55d1bb7994d49-screen.jpg"
          }`}
          layout={"fill"}
          objectFit={"fill"}
          quality={100}
          alt="list"
        />
      </div>
    </div>
  );
}
