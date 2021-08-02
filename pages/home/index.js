import Layout from "../../components/layout/Layout";
import Card from "../../components/listContent/card/Card";
import CardPerson from "../../components/listContent/card/CardPerson";
import IconPeople from "../../components/icons/IconPeople";
import IconMovie from "../../components/icons/IconMovie";
import IconTv from "../../components/icons/IconTv";
import ContentBox from "../../components/listContent/content/ContentBox";
import headerStyle from "../../styles/header.module.css";
import { cinemaAPI } from "../../services/api";
import { MainNavigation } from "../../components/navigation/Navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
    revalidate: 86400,
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

  const router = useRouter();

  const btnActive =
    "bg-gradient-to-br rounded-sm shadow transform from-sky-400 to-primary text-white";
  const btnNonActive =
    "focus:outline-none rounded-sm border border-gray-600 focus:ring focus:ring-gray-500 text-black dark:text-white";

  const [filter, setFilter] = useState("day");
  const [listTrending, setListTrending] = useState({
    movie: trendingMoviesDay,
    tv: trendingTvShowsDay,
    person: trendingPersonsDay,
  });
  const [listContent, setListContent] = useState({
    arr: [
      {
        title: "Movies",
        icon: <IconMovie />,
        data: listTrending.movie,
        isPerson: false,
        isBlur: true,
      },
      {
        title: "Tv Shows",
        icon: <IconTv />,
        data: listTrending.tv,
        isPerson: false,
        isBlur: true,
      },
      {
        title: "Persons",
        icon: <IconPeople />,
        data: listTrending.person,
        isPerson: true,
        isBlur: true,
      },
    ],
  });

  const goFilterTrending = (e) => {
    setFilter(e.target.name);
  };

  const goDetail = (e) => {
    switch (e.media_type) {
      case "movie":
        router.push(`/movies/${e.id}`);
        break;
      case "tv":
        router.push(`/tv-shows/${e.id}`);
        break;
      default:
        router.push(`/home`);
        break;
    }
  };

  const handleScroll = (e) => {
    const newArr = listContent.arr.map((content, index) => {
      if (e.index == index) {
        content.isBlur = e.isBlur;
      }
      return content;
    });
    if (e.type === "main") {
      setListContent({
        arr: newArr,
      });
    }
  };

  const goDetailPerson = (e) => {
    router.push(`/persons/${e.id}`);
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

  useEffect(() => {
    setListContent({
      arr: [
        {
          title: "Movies",
          icon: <IconMovie />,
          data: listTrending.movie,
          isPerson: false,
          isBlur: true,
        },
        {
          title: "Tv Shows",
          icon: <IconTv />,
          data: listTrending.tv,
          isPerson: false,
          isBlur: true,
        },
        {
          title: "Persons",
          icon: <IconPeople />,
          data: listTrending.person,
          isPerson: true,
          isBlur: true,
        },
      ],
    });
  }, [listTrending]);

  return (
    <Layout title="Home">
      <header>
        <MainNavigation />
        <div className={`relative ${headerStyle.headerContainer}`}>
          <div className="absolute w-full h-full">
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
          <div className="absolute transform transition-all top-0 left-0 w-full h-full z-10 bg-gradient-to-b from-black via-transparent to-black opacity-50 duration-500"></div>
          <div className="absolute h-full text-center text-white transition-colors duration-500 flex justify-center items-center p-4 md:px-8 lg:px-12 z-10 w-full">
            <div className="max-w-xl relative h-auto">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-6xl font-semibold mb-4">
                Unlimited Trailer movies, TV shows, and more.
              </h1>
              <h2 className="text-lg font-medium sm:text-xl lg:text-2xl mb-3 mt-3">
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
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
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
              } p-1 w-1/2 text-center text-sm sm:text-base md:text-lg lg:text-xl hover:bg-primary hover:scale-105 transition duration-200 focus:outline-none`}
            >
              Day
            </button>
            <button
              onClick={goFilterTrending}
              name="week"
              className={`${
                filter === "week" ? btnActive : btnNonActive
              } w-1/2 p-1 text-center text-sm sm:text-base md:text-lg lg:text-xl hover:bg-primary  hover:scale-105 transition duration-200 focus:outline-none`}
            >
              Week
            </button>
          </div>
        </div>

        {listContent.arr.map((content, idxContent) => {
          return (
            <ContentBox
              key={idxContent}
              title={content.title}
              icon={content.icon}
              lengthContent={content.data.length}
              indexContent={idxContent}
              isBlur={content.isBlur}
              onScroll={(e) => handleScroll(e)}
              type="main"
            >
              {!content.isPerson
                ? content.data
                    .map((vid, index) => {
                      return (
                        <Card
                          onHandleClick={(e) => goDetail(e)}
                          key={index}
                          dataContent={vid}
                          indexContent={index}
                        />
                      );
                    })
                    .slice(0, 10)
                : content.data
                    .map((vid, index) => {
                      return (
                        <CardPerson
                          onHandleClick={(e) => goDetailPerson(e)}
                          key={index}
                          dataContent={vid}
                          indexContent={index}
                        />
                      );
                    })
                    .slice(0, 10)}
            </ContentBox>
          );
        })}
      </div>
      <hr className="border-b-4 border-gray-500 shadow-2xl" />
    </Layout>
  );
}
