import Layout from "../../components/layout/Layout";
import Card from "../../components/listContent/card/Card";
import Image from "next/image";
import IconMovie from "../../components/icons/IconMovie";
import Header from "../../components/header/Header";
import ContentBox from "../../components/listContent/content/ContentBox";
import { cinemaAPI } from "../../services/api";

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
    revalidate: 3600,
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
    console.log("detail", e);
  };

  return (
    <Layout title="Movies">
      <Header>
        <Image
          className="bg-fixed top-0 z-0"
          src={`${
            listDiscover[Math.floor(Math.random() * listDiscover.length)]
              .backdrop_path
          }`}
          alt="bg-intro"
          layout={"fill"}
          objectFit={"cover"}
          quality={100}
          priority={true}
        />
      </Header>

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
