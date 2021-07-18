import Layout from "../../components/layout/Layout";
import Card from "../../components/listContent/card/Card";
import IconMovie from "../../components/icons/IconMovie";
import Header from "../../components/header/Header";
import ContentBox from "../../components/listContent/content/ContentBox";
import { cinemaAPI } from "../../services/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getStaticProps() {
  const [
    listDiscover,
    listNowPlaying,
    listPopular,
    listTopRated,
    listUpcoming,
  ] = await Promise.all([
    cinemaAPI.get(`/movies`),
    cinemaAPI.get(`/movies/now-playing`),
    cinemaAPI.get(`/movies/popular`),
    cinemaAPI.get(`/movies/top-rated`),
    cinemaAPI.get(`/movies/upcoming`),
  ]);

  return {
    props: {
      listDiscover: listDiscover.data.data.results,
      listNowPlaying: listNowPlaying.data.data.results,
      listPopular: listPopular.data.data.results,
      listTopRated: listTopRated.data.data.results,
      listUpcoming: listUpcoming.data.data.results,
    },
    revalidate: 86400,
  };
}

export default function MoviesPage(props) {
  const {
    listDiscover,
    listNowPlaying,
    listPopular,
    listTopRated,
    listUpcoming,
  } = props;

  const router = useRouter();

  const [dataHeader, setDataHeader] = useState({
    data: {
      backdrop_path: "https://i.ibb.co/9spxhL0/2588754.jpg",
      title: "",
      name: "",
      overview: "",
    },
  });

  const listContent = [
    {
      title: "Discover",
      icon: <IconMovie />,
      data: listDiscover,
    },
    {
      title: "Now Playing",
      icon: <IconMovie />,
      data: listNowPlaying,
    },
    {
      title: "Popular",
      icon: <IconMovie />,
      data: listPopular,
    },
    {
      title: "Top Rated",
      icon: <IconMovie />,
      data: listTopRated,
    },
    {
      title: "Upcoming",
      icon: <IconMovie />,
      data: listUpcoming,
    },
  ];

  const goDetail = (e) => {
    router.push(`/movies/${e.id}`);
  };

  // useEffect(() => {
  //   setDataHeader({
  //     data: listDiscover[Math.floor(Math.random() * listDiscover.length - 1)],
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!dataHeader.data) {
  //     console.log(dataHeader);
  //     router.replace(router.asPath);
  //   }
  // }, [dataHeader]);

  return (
    <Layout title="Movies">
      {/* <Header dataHeader={dataHeader.data} onGoDetail={goDetail}></Header> */}
      <Header
        dataHeader={
          listDiscover[Math.floor(Math.random() * listDiscover.length)]
        }
        onGoDetail={goDetail}
      ></Header>

      <hr className="border-b-4 border-gray-500 shadow-2xl" />

      <div className="p-4 sm:p-6 md:p-8 lg-p-10 transform transition-all duration-500 bg-gray-100 dark:bg-black text-black dark:text-white">
        {listContent.map((content, idxContent) => {
          return (
            <ContentBox
              key={idxContent}
              title={content.title}
              icon={content.icon}
            >
              {content.data.map((vid, index) => {
                return (
                  <Card
                    onHandleClick={(e) => goDetail(e)}
                    key={index}
                    dataContent={vid}
                    indexContent={index}
                  />
                );
              })}
            </ContentBox>
          );
        })}
      </div>
      <hr className="border-b-4 border-gray-500 shadow-2xl" />
    </Layout>
  );
}
