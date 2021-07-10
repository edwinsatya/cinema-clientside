import headerStyle from "../../styles/header.module.css";
import IconClose from "../icons/IconClose";
import Image from "next/image";
import IconFire from "../icons/IconFire";
import { MainNavigation } from "../../components/navigation/Navigation";
import { useEffect, useState } from "react";

export default function DetailHeader(props) {
  const { dataHeader, indexTrailer, onCloseTrailer } = props;

  const [showTrailer, setShowTrailer] = useState(false);

  const closeTrailer = () => {
    setShowTrailer(false);
    onCloseTrailer();
  };

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

  useEffect(() => {
    if (indexTrailer !== null) {
      setShowTrailer(true);
    }
  }, [indexTrailer]);

  return (
    <header>
      <MainNavigation />
      <div
        className={`relative ${
          showTrailer
            ? headerStyle.detailHeaderIframe
            : headerStyle.detailHeaderContainer
        }`}
      >
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
            !showTrailer ? "opacity-70" : "opacity-80"
          } duration-500`}
        ></div>
        <div
          className={`relative text-white transition-colors duration-500 flex justify-center items-center p-4 md:px-8 lg:px-12 z-10 w-full ${
            showTrailer
              ? headerStyle.detailHeaderIframe
              : headerStyle.detailHeaderContainer
          }`}
        >
          {!showTrailer ? (
            <div className="py-2 px-4 md:px-8 lg:px-12 absolute top-12 sm:top-16 lg:top-24 flex flex-col w-full text-black dark:text-white">
              <div>
                <h2 className="text-md sm:text-lg md:text-xl font-bold">
                  {dataHeader.title || dataHeader.name}
                </h2>
                <span className="text-md sm:text-lg md:text-xl font-base">
                  {dataHeader.release_date || dataHeader.first_air_date}
                </span>
              </div>

              <hr className="border-b border-gray-500 shadow-2xl my-4 sm:my-6 lg:my-8" />

              <div className="flex flex-col items-center sm:flex-row sm:items-start mb-2 sm:mb-4 lg:mb-6">
                <div className="relative h-60 w-44 sm:h-64 sm:w-48 lg:h-72 lg:w-52 mb-2 flex-shrink-0 rounded-lg ring-4 ring-black transform dark:ring-gray-900 overflow-hidden">
                  <Image
                    src={`${
                      dataHeader.poster_path
                        ? "https://image.tmdb.org/t/p/original" +
                          dataHeader.poster_path
                        : "https://i.ibb.co/6HwNvXv/coming-soon-reopening-event-retail-sale-design-template-79543bc1062ebb6f9eb55d1bb7994d49-screen.jpg"
                    }`}
                    alt="bg-poster"
                    layout={"fill"}
                    objectFit={"fill"}
                    quality={100}
                  />
                </div>
                <div className="flex flex-col sm:flex-row">
                  <div className="mb-2 sm:mb-0 w-full sm:w-9/12 sm:px-4">
                    <div className="text-center sm:text-left font-semibold">
                      Overview {dataHeader.title || dataHeader.name}
                    </div>
                    <div>{dataHeader.overview}</div>
                  </div>
                  <div className="w-full sm:w-3/12 text-black dark:text-white">
                    <div className="rounded-md  bg-gray-400 dark:bg-gray-900 p-2 text-center">
                      Rating {dataHeader.vote_average}
                    </div>
                    <div className="flex justify-center my-2">
                      {countRating(dataHeader.vote_average).map(
                        (fire, index) => {
                          return (
                            <IconFire
                              key={index}
                              className={`${
                                fire ? "text-yellow-300" : "text-gray-500"
                              }`}
                            />
                          );
                        }
                      )}
                    </div>
                    <div className="text-center">
                      Popularity {dataHeader.popularity}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-gray-200 rounded-lg ring ring-black dark:bg-gray-900 dark:ring-gray-800 p-2 sm:p-4 lg:p-6">
                <div className="flex">
                  <span className=" sm:w-2/12">Title</span>
                  <span>:</span>
                  <span className="sm:ml-2 sm:w-7/12 uppercase">
                    {dataHeader.title || dataHeader.name}
                  </span>
                </div>
                <div className="flex">
                  <span className=" sm:w-2/12">Original Title</span>
                  <span>:</span>
                  <span className="sm:ml-2 sm:w-7/12 uppercase">
                    {dataHeader.original_title || dataHeader.original_name}
                  </span>
                </div>
                <div className="flex">
                  <span className=" sm:w-2/12">Genres</span>
                  <span>:</span>
                  <span className="sm:ml-2 sm:w-7/12 text-gray-500">
                    {dataHeader.genres.map((genre) => genre.name).join(", ")}
                  </span>
                </div>
                <div className="flex">
                  <span className=" sm:w-2/12">Realease On</span>
                  <span>:</span>
                  <span className="sm:ml-2 sm:w-7/12">Scarlet Nexus</span>
                </div>
              </div>
            </div>
          ) : (
            // <div className="max-w-xl px-2 absolute text-center md:px-0 md:bottom-12 md:left-12 md:text-left">
            //   <h1 className="text-2xl text-primary sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            //     {dataHeader.title || dataHeader.name}
            //   </h1>
            //   <h2 className="text-lg text-black dark:text-white font-medium sm:text-xl lg:text-2xl mb-3 mt-3">
            //     {dataHeader.overview.length > 233
            //       ? dataHeader.overview.substr(0, 233) + "..."
            //       : dataHeader.overview}
            //   </h2>
            // </div>
            <div className="absolute w-full h-full pt-20 lg:pt-24 px-12 pb-6 ring-4">
              <div className="h-full w-full ring-4 ring-black dark:ring-gray-900 rounded-lg">
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
