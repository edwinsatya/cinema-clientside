import Image from "next/image";

export default function CardSimplePerson(props) {
  const { dataContent, onHandleClick, classImage, classWrapper, classText } =
    props;

  return (
    <div
      onClick={() => onHandleClick(dataContent)}
      className={`flex flex-col border dark:border-gray-800 transform transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden rounded-lg shadow-md my-5 ${classWrapper} flex-shrink-0`}
    >
      <div className={`relative ${classImage}`}>
        <Image
          src={`${
            dataContent.profile_path
              ? "https://image.tmdb.org/t/p/original" + dataContent.profile_path
              : "https://i.ibb.co/xMkDFGB/profile.jpg"
          }`}
          layout={"fill"}
          objectFit={"fill"}
          quality={100}
          alt="list"
        />
      </div>
      <div
        className={`relative flex flex-col justify-center items-start p-3 ${classText}`}
      >
        <span className={`font-bold text-base text-left`}>
          {dataContent.name}
        </span>
        <span className={`font-normal text-base text-left`}>
          {(dataContent.character === "" ? "-" : dataContent.character) ||
            dataContent.known_for
              .map((el) => el.title)
              .join(",")
              .substr(0, 22) + ".."}
        </span>
      </div>
    </div>
  );
}
