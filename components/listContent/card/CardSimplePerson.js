import Image from "next/image";

export default function CardSimplePerson(props) {
  const { dataContent, onHandleClick } = props;
  //mx-2 w-32 h-40 sm:w-24 sm:h-44 md:w-36 md:h-48 lg:w-40 lg:h-52
  return (
    <div
      onClick={() => onHandleClick(dataContent)}
      className="flex flex-col border dark:border-gray-800 transform transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden rounded-lg shadow-md my-3 mx-2 flex-shrink-0"
    >
      <div
        className={`relative w-32 h-40 sm:w-24 sm:h-44 md:w-36 md:h-48 lg:w-40 lg:h-52`}
      >
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
        className={`relative flex flex-col justify-center items-start p-3 w-32 h-auto sm:w-24 md:w-36 lg:w-40`}
      >
        <span className={`font-bold text-base text-left`}>
          {dataContent.name}
        </span>
        <span className={`font-normal text-base text-left`}>
          {dataContent.character}
        </span>
      </div>
    </div>
  );
}
