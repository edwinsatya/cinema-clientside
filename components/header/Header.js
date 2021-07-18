import { MainNavigation } from "../../components/navigation/Navigation";
import headerStyle from "../../styles/header.module.css";
import Image from "next/image";
import MainButton from "../buttons/MainButton";

export default function Header(props) {
  const { dataHeader, onGoDetail } = props;

  return (
    <header>
      <MainNavigation />
      <div className={`relative ${headerStyle.headerContainer}`}>
        <div className="absolute w-full h-full">
          {dataHeader.backdrop_path !== undefined ? (
            <Image
              className="bg-fixed top-0 z-0"
              src={`${
                dataHeader.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${dataHeader.backdrop_path}`
                  : "https://i.ibb.co/9spxhL0/2588754.jpg"
              }`}
              alt="bg-intro"
              layout={"fill"}
              objectFit={"cover"}
              quality={100}
              priority={true}
            />
          ) : (
            <Image
              className="bg-fixed top-0 z-0"
              src="https://i.ibb.co/9spxhL0/2588754.jpg"
              alt="bg-intro"
              layout={"fill"}
              objectFit={"cover"}
              quality={100}
              priority={true}
            />
          )}
        </div>
        <div className="absolute transform transition-all top-0 left-0 w-full h-full z-10 bg-gradient-to-b from-black via-transparent to-black opacity-40 duration-500"></div>
        <div
          className={`relative text-white transition-colors duration-500 flex justify-center items-center p-4 md:px-8 lg:px-12 z-10 w-full ${headerStyle.headerContainer}`}
        >
          <div className="max-w-xl px-2 absolute text-center md:px-0 md:bottom-12 md:left-12 md:text-left">
            <h1 className="text-2xl text-primary sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              {dataHeader.title || dataHeader.name}
            </h1>
            <h2 className="text-lg text-white font-medium sm:text-xl lg:text-2xl mb-3 mt-3">
              {dataHeader.overview.length > 233
                ? dataHeader.overview.substr(0, 233) + "..."
                : dataHeader.overview}
            </h2>
            <div className="w-5/12 mx-auto md:mx-0">
              <MainButton
                handleClick={() => onGoDetail(dataHeader)}
                className="p-2 rounded-md bg-white dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-1 text-black dark:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-black dark:text-white">More Info</span>
                </div>
              </MainButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
