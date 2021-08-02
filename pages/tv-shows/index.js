import Layout from "../../components/layout/Layout";
import Card from "../../components/listContent/card/Card";
import IconTv from "../../components/icons/IconTv";
import Header from "../../components/header/Header";
import ContentBox from "../../components/listContent/content/ContentBox";
import { cinemaAPI } from "../../services/api";
import { useRouter } from "next/router";
import { useState } from "react";

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
    revalidate: 86400,
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

  const router = useRouter();
  const [listContent, setListContent] = useState({
    arr: [
      {
        title: "Airing Today",
        icon: <IconTv />,
        data: listAiringToday,
        isBlur: true,
      },
      {
        title: "Popular",
        icon: <IconTv />,
        data: listPopular,
        isBlur: true,
      },
      {
        title: "Top Rated",
        icon: <IconTv />,
        data: listTopRated,
        isBlur: true,
      },
      {
        title: "On Air",
        icon: <IconTv />,
        data: listOnAir,
        isBlur: true,
      },
    ],
  });

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

  const goDetail = (e) => {
    router.push(`/tv-shows/${e.id}`);
  };

  return (
    <Layout title="Tv-Shows">
      {/* <Header dataHeader={dataHeader.data} onGoDetail={goDetail}></Header> */}
      <Header
        dataHeader={
          listDiscover[Math.floor(Math.random() * listDiscover.length)]
        }
        onGoDetail={goDetail}
      ></Header>

      <hr className="border-b-4 border-gray-500 shadow-2xl" />

      <div className="p-4 sm:p-6 md:p-8 lg-p-10 transform transition-all duration-500 bg-gray-100 dark:bg-black text-black dark:text-white">
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
              {content.data
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
                .slice(0, 10)}
            </ContentBox>
          );
        })}
      </div>
      <hr className="border-b-4 border-gray-500 shadow-2xl" />
    </Layout>
  );
}
