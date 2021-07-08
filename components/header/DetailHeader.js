import { MainNavigation } from "../../components/navigation/Navigation";
import headerStyle from "../../styles/header.module.css";
import IconClose from "../icons/IconClose";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DetailHeader(props) {
  const { dataHeader, indexTrailer, onCloseTrailer } = props;

  const [showTrailer, setShowTrailer] = useState(false);

  const closeTrailer = () => {
    setShowTrailer(false);
    onCloseTrailer();
  };

  useEffect(() => {
    if (indexTrailer !== null) {
      setShowTrailer(true);
    }
  }, [indexTrailer]);

  return (
    <header>
      <MainNavigation />
      <div className={`relative ${headerStyle.headerContainer}`}>
        <div className="absolute w-full h-full">
          <Image
            className="bg-fixed top-0 z-0"
            src={`${
              dataHeader.backdrop_path
                ? "https://image.tmdb.org/t/p/original" +
                  dataHeader.backdrop_path
                : "https://i.ibb.co/9spxhL0/2588754.jpg"
            }`}
            alt="bg-intro"
            layout={"fill"}
            objectFit={"cover"}
            quality={100}
            priority={true}
          />
        </div>
        <div
          className={`absolute transform transition-all top-0 left-0 w-full h-full z-10 bg-gradient-to-b from-gray-300 dark:from-black to-gray-300 dark:to-black ${
            !showTrailer ? "opacity-30" : "opacity-75"
          } duration-500`}
        ></div>
        <div
          className={`relative text-white transition-colors duration-500 flex justify-center items-center p-4 md:px-8 lg:px-12 z-10 w-full ${headerStyle.headerContainer}`}
        >
          {!showTrailer ? (
            <div className="max-w-xl px-2 absolute text-center md:px-0 md:bottom-12 md:left-12 md:text-left">
              <h1 className="text-2xl text-primary sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
                {dataHeader.title || dataHeader.name}
              </h1>
              <h2 className="text-lg text-black dark:text-white font-medium sm:text-xl lg:text-2xl mb-3 mt-3">
                {dataHeader.overview.length > 233
                  ? dataHeader.overview.substr(0, 233) + "..."
                  : dataHeader.overview}
              </h2>
            </div>
          ) : (
            <div className="absolute w-full h-full pt-20 lg:pt-24 px-12 pb-6 ring-4">
              <div className=" h-full w-full ring-4 ring-black dark:ring-gray-900 rounded-lg">
                <div
                  onClick={() => closeTrailer()}
                  className="cursor-pointer bg-gray-600 p-1 rounded-full absolute top-16 lg:top-20 right-8"
                >
                  <IconClose />
                </div>
                {indexTrailer !== null ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${dataHeader.video[indexTrailer].key}?rel=0&disablekb=1&modestbranding=1&showinfo=0&autohide=1`}
                      frameBorder="0"
                      allowFullScreen
                      //   style={{ height: "100%", width: "100%", objectFit: "initial" }}
                    ></iframe>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
