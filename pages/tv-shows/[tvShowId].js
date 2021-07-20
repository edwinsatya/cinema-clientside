import Layout from "../../components/layout/Layout";
import DetailHeader from "../../components/header/DetailHeader";
import ContentBox from "../../components/listContent/content/ContentBox";
import ContentBoxReview from "../../components/listContent/content/ContentBoxReview";
import Card from "../../components/listContent/card/Card";
import CardReview from "../../components/listContent/card/CardReview";
import CardSeasons from "../../components/listContent/card/CardSeasons";
import CardAnyTrailer from "../../components/listContent/card/CardAnyTrailer";
import CardNoTrailer from "../../components/listContent/card/CardNoTrailer";
import IconTv from "../../components/icons/IconTv";
import IconComment from "../../components/icons/IconComment";
import { cinemaAPI } from "../../services/api";
import { useState } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const tvShowId = context.params.tvShowId;
  const tv = await cinemaAPI.get(`/tv/${tvShowId}`);

  return {
    props: {
      detailTv: tv.data.data,
    },
  };
}

export default function DetailTvShow(props) {
  const { detailTv } = props;
  const router = useRouter();

  const [indexTrailer, setIndexTrailer] = useState(null);

  const [showReviews, setShowReviews] = useState(false);

  const listContent = [
    {
      title: "Recommended Tv Shows",
      icon: <IconTv />,
      data: detailTv.recommendations,
    },
    {
      title: "Similar Tv Shows",
      icon: <IconTv />,
      data: detailTv.similar,
    },
  ];

  const goDetail = (e) => {
    router.push(`/tv-shows/${e.id}`);
    setIndexTrailer(null);
    setShowReviews(false);
  };

  const selectedTrailer = (index) => {
    window.scrollTo(0, 0);
    setIndexTrailer(index);
  };

  return (
    <Layout title="Detail Tv Show">
      <DetailHeader
        dataHeader={detailTv}
        indexTrailer={indexTrailer}
        onCloseTrailer={() => setIndexTrailer(null)}
      ></DetailHeader>

      <hr className="border-b-4 border-gray-500 shadow-2xl" />

      <section id="list-content">
        <div className="p-4 sm:p-6 md:p-8 lg-p-10 transform transition-all duration-500 bg-gray-100 dark:bg-black text-black dark:text-white">
          <ContentBox title={"List Trailer :"}>
            {detailTv.video.length > 0 ? (
              detailTv.video.map((vid, index) => {
                return (
                  <CardAnyTrailer
                    key={index}
                    indexTrailer={index}
                    videoKey={vid.key}
                    onClick={(e) => selectedTrailer(e)}
                  />
                );
              })
            ) : (
              <CardNoTrailer title={"Trailer Coming Soon"} />
            )}
          </ContentBox>

          <ContentBox title={"Seasons :"}>
            {detailTv.seasons.length > 0 ? (
              detailTv.seasons.map((season, index) => {
                return (
                  <CardSeasons
                    key={index}
                    dataContent={season}
                    indexContent={index}
                    onHandleClick={(e) => goDetail(e)}
                  />
                );
              })
            ) : (
              <CardNoTrailer title={"Not Available"} />
            )}
          </ContentBox>

          <ContentBoxReview title={"Reviews"} icon={<IconComment />}>
            <div
              className={`flex justify-center text-xs sm:text-sm md:text-base lg:text-lg ${
                showReviews ? "mb-1 sm:mb-3 lg:mb-4" : "mb-0"
              }`}
            >
              <button
                onClick={() => setShowReviews(!showReviews)}
                className="bg-gray-700 text-white hover:bg-gray-500 dark:bg-white dark:text-black dark:hover:bg-gray-500 rounded-md p-2 focus:outline-none"
              >
                <span>{!showReviews ? "Show Reviews" : "Hide Reviews"}</span>
              </button>
            </div>
            {showReviews ? (
              detailTv.reviews.length > 0 ? (
                detailTv.reviews.map((review, index) => {
                  return (
                    <CardReview
                      key={index}
                      review={review}
                      reviewLength={detailTv.reviews.length}
                      indexContent={index}
                    />
                  );
                })
              ) : (
                <div className="flex justify-center text-xs sm:text-sm md:text-base lg:text-xl font-bold">
                  <span>No Have Review</span>
                </div>
              )
            ) : (
              ""
            )}
          </ContentBoxReview>

          {listContent.map((content, idxContent) => {
            return (
              <ContentBox
                key={idxContent}
                title={content.title}
                icon={content.icon}
              >
                {content.data.length > 0 ? (
                  content.data.map((vid, index) => {
                    return (
                      <Card
                        onHandleClick={(e) => goDetail(e)}
                        key={index}
                        dataContent={vid}
                        indexContent={index}
                      />
                    );
                  })
                ) : (
                  <CardNoTrailer title={"Not Available"} />
                )}
              </ContentBox>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
