import Layout from "../../components/layout/Layout";
import Card from "../../components/listContent/card/Card";
import Image from "next/image";
import IconTv from "../../components/icons/IconTv";
import Header from "../../components/header/Header";
import ContentBox from "../../components/listContent/content/ContentBox";
import { cinemaAPI } from "../../services/api";

export async function getStaticProps() {
  const [listDiscover, listTopRated, listPopular, listAiringToday, listOnAir] =
    await Promise.all([
      cinemaAPI.get(`/tv`),
      cinemaAPI.get(`/tv/top-rated`),
      cinemaAPI.get(`/tv/popular`),
      cinemaAPI.get(`/tv/airing-today`),
      cinemaAPI.get(`/tv/on-air`),
    ]);

  return {
    props: {
      listDiscover: listDiscover.data.data.results,
      listTopRated: listTopRated.data.data.results,
      listPopular: listPopular.data.data.results,
      listAiringToday: listAiringToday.data.data.results,
      listOnAir: listOnAir.data.data.results,
    },
    revalidate: 3600,
  };
}

export default function TvShowsPage(props) {
  const {
    listDiscover,
    listTopRated,
    listPopular,
    listAiringToday,
    listOnAir,
  } = props;

  const listContent = [
    {
      title: "Discover",
      icon: <IconTv />,
      data: listDiscover,
    },
    {
      title: "Top Rated",
      icon: <IconTv />,
      data: listTopRated,
    },
    {
      title: "Popular",
      icon: <IconTv />,
      data: listPopular,
    },
    {
      title: "Airing Today",
      icon: <IconTv />,
      data: listAiringToday,
    },
    {
      title: "On Air",
      icon: <IconTv />,
      data: listOnAir,
    },
  ];

  const goDetail = (e) => {
    console.log("detail", e);
  };

  return (
    <Layout title="Tv-Shows">
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
