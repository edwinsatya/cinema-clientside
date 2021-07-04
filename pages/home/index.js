import Layout from "../../components/layout/Layout";
import cardStyle from "../../styles/card.module.css";
import Card from "../../components/listContent/card/Card";
import CardPerson from "../../components/listContent/card/CardPerson";
import IconPeople from "../../components/icons/IconPeople";
import IconMovie from "../../components/icons/IconMovie";
import IconTv from "../../components/icons/IconTv";
import { cinemaAPI } from "../../services/api";
import { MainNavigation } from "../../components/navigation/Navigation";
import { useEffect, useState } from "react";

export async function getStaticProps() {
  const [
    listMovieDay,
    listTvDay,
    listPersonDay,
    listMovieWeek,
    listTvWeek,
    listPersonWeek,
  ] = await Promise.all([
    cinemaAPI.get(`/home/trending/movie/day`),
    cinemaAPI.get(`/home/trending/tv/day`),
    cinemaAPI.get(`/home/trending/person/day`),
    cinemaAPI.get(`/home/trending/movie/week`),
    cinemaAPI.get(`/home/trending/tv/week`),
    cinemaAPI.get(`/home/trending/person/week`),
  ]);

  return {
    props: {
      trendingMoviesDay: listMovieDay.data.data.results,
      trendingTvShowsDay: listTvDay.data.data.results,
      trendingPersonsDay: listPersonDay.data.data.results,
      trendingMoviesWeek: listMovieWeek.data.data.results,
      trendingTvShowsWeek: listTvWeek.data.data.results,
      trendingPersonsWeek: listPersonWeek.data.data.results,
    },
    revalidate: 3600,
  };
}

export default function Home(props) {
  const {
    trendingMoviesDay,
    trendingTvShowsDay,
    trendingPersonsDay,
    trendingMoviesWeek,
    trendingTvShowsWeek,
    trendingPersonsWeek,
  } = props;

  const btnActive =
    "bg-gradient-to-br rounded-sm shadow transform from-sky-400 to-primary hover:from-sky-400 hover:to-sky-500 hover:scale-105 transition duration-200 text-white focus:outline-none focus:ring focus:ring-blue-400";
  const btnNonActive =
    "focus:outline-none rounded-sm border border-gray-600 focus:ring focus:ring-gray-500";

  const [filter, setFilter] = useState("day");
  const [listTrending, setListTrending] = useState({
    movie: trendingMoviesDay,
    tv: trendingTvShowsDay,
    person: trendingPersonsDay,
  });

  //   const listVid = [
  //     {
  //       poster:
  //         "https://image.tmdb.org/t/p/original/jTswp6KyDYKtvC52GbHagrZbGvD.jpg",
  //       back: "https://image.tmdb.org/t/p/original/uAQrHntCccFpvxp75XdQgqexlJd.jpg",
  //       title: "A Quiet Place Part II",
  //     },
  //     {
  //       poster:
  //         "https://image.tmdb.org/t/p/original/jTswp6KyDYKtvC52GbHagrZbGvD.jpg",
  //       back: "https://image.tmdb.org/t/p/original/uAQrHntCccFpvxp75XdQgqexlJd.jpg",
  //       title: "A Quiet Place Part a",
  //     },
  //     {
  //       poster:
  //         "https://image.tmdb.org/t/p/original/jTswp6KyDYKtvC52GbHagrZbGvD.jpg",
  //       back: "https://image.tmdb.org/t/p/original/uAQrHntCccFpvxp75XdQgqexlJd.jpg",
  //       title: "A Quiet Place Part b",
  //     },
  //     {
  //       poster:
  //         "https://image.tmdb.org/t/p/original/jTswp6KyDYKtvC52GbHagrZbGvD.jpg",
  //       back: "https://image.tmdb.org/t/p/original/uAQrHntCccFpvxp75XdQgqexlJd.jpg",
  //       title: "A Quiet Place Part c",
  //     },
  //     {
  //       poster:
  //         "https://image.tmdb.org/t/p/original/jTswp6KyDYKtvC52GbHagrZbGvD.jpg",
  //       back: "https://image.tmdb.org/t/p/original/uAQrHntCccFpvxp75XdQgqexlJd.jpg",
  //       title: "A Quiet Place Part d",
  //     },
  //     {
  //       poster:
  //         "https://image.tmdb.org/t/p/original/jTswp6KyDYKtvC52GbHagrZbGvD.jpg",
  //       back: "https://image.tmdb.org/t/p/original/uAQrHntCccFpvxp75XdQgqexlJd.jpg",
  //       title: "A Quiet Place Part e",
  //     },
  //   ];

  const goFilterTrending = (e) => {
    setFilter(e.target.name);
  };

  useEffect(() => {
    if (filter === "day") {
      setListTrending({
        movie: trendingMoviesDay,
        tv: trendingTvShowsDay,
        person: trendingPersonsDay,
      });
    } else {
      setListTrending({
        movie: trendingMoviesWeek,
        tv: trendingTvShowsWeek,
        person: trendingPersonsWeek,
      });
    }
  }, [filter]);

  return (
    <Layout title="Home">
      <header>
        <MainNavigation />
        <div className="relative" style={{ height: "90vh" }}>
          <div className="absolute w-full" style={{ height: "90vh" }}>
            <video
              autoPlay={true}
              loop={true}
              muted={true}
              src="./home.mp4"
              type="video/mp4"
              style={{ height: "100%", width: "100%", objectFit: "initial" }}
            ></video>
            {/* <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/DccARtSOwhw?autoplay=1&mute=1&rel=0&controls=0&disablekb=1&playlist=DccARtSOwhw&loop=1&modestbranding=1&playsinline=1"
              frameBorder="0"
              allowFullScreen
              style={{ height: "100%", width: "100%", objectFit: "initial" }}
            ></iframe> */}
          </div>
          <div className="absolute transform transition-all top-0 left-0 w-full h-full z-10 bg-gradient-to-b from-gray-300 dark:from-black via-transparent dark:via-transparent to-gray-300 dark:to-black opacity-30 duration-500"></div>
          <div className="absolute h-full text-center text-black dark:text-white transition-colors duration-500 flex justify-center items-center p-4 md:px-8 lg:px-12 z-10 w-full">
            <div className="max-w-xl relative h-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
                Unlimited Trailer movies, TV shows, and more.
              </h1>
              <h2 className="text-2xl font-medium sm:text-3xl lg:text-4xl mb-3 mt-3">
                Watch anywhere. Watch anytime.
              </h2>
            </div>
          </div>
        </div>
      </header>

      <hr className="border-b-4 border-gray-500 shadow-2xl" />

      <div className="p-4 sm:p-6 md:p-8 lg-p-10 transform transition-all duration-500 bg-gray-100 dark:bg-black text-black dark:text-white">
        <div>
          <div>
            {/* button control trending */}
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
              Trending of the :
            </h3>
          </div>
          <div className="w-1/2 my-4">
            {/* 
                w-4/12 px-2 py-3 sm:py-4 text-xs sm:p-2 sm:text-sm lg:px-4 lg:text-lg mx-auto mt-3 lg:mt-0
                */}
            <button
              onClick={goFilterTrending}
              name="day"
              className={`${
                filter === "day" ? btnActive : btnNonActive
              } p-1 w-1/2 text-center text-sm sm:text-md md:text-lg lg:text-xl`}
            >
              Day
            </button>
            <button
              onClick={goFilterTrending}
              name="week"
              className={`${
                filter === "week" ? btnActive : btnNonActive
              } w-1/2 p-1 text-center text-sm sm:text-md md:text-lg lg:text-xl`}
            >
              Week
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center">
            {/* trending movies */}
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
              Movies
            </h3>
            <div className="ml-3">
              <IconMovie />
            </div>
          </div>
          <div className="p-4 shadow-inner">
            <div
              className={`${cardStyle.cardWrapper} flex items-center overflow-x-auto overflow-y-hidden`}
            >
              {listTrending.movie.map((vid, index) => {
                return (
                  <Card key={index} dataContent={vid} indexContent={index} />
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center">
            {/* trending tv show */}
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
              Tv Shows
            </h3>
            <div className="ml-3">
              <IconTv />
            </div>
          </div>
          <div className="p-4 shadow-inner">
            <div
              className={`${cardStyle.cardWrapper} flex items-center overflow-x-auto overflow-y-hidden`}
            >
              {listTrending.tv.map((vid, index) => {
                return (
                  <Card key={index} dataContent={vid} indexContent={index} />
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center">
            {/* trending person */}
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
              Person
            </h3>
            <div className="ml-3">
              <IconPeople />
            </div>
          </div>
          <div className="p-4 shadow-inner">
            <div
              className={`${cardStyle.cardWrapper} flex items-center overflow-x-auto overflow-y-hidden`}
            >
              {listTrending.person.map((person, index) => {
                return (
                  <CardPerson
                    key={index}
                    dataContent={person}
                    indexContent={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <hr className="border-b-4 border-gray-500 shadow-2xl" />
    </Layout>
  );
}
