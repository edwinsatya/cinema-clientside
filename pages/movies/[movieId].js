import Layout from "../../components/layout/Layout";
import DetailHeader from "../../components/header/DetailHeader";
import ContentBox from "../../components/listContent/content/ContentBox";
import ContentBoxReview from "../../components/listContent/content/ContentBoxReview";
import ContentBoxMedia from "../../components/listContent/content/ContentBoxMedia";
import CardAnyTrailer from "../../components/listContent/card/CardAnyTrailer";
import CardMedia from "../../components/listContent/card/CardMedia";
import Card from "../../components/listContent/card/Card";
import CardReview from "../../components/listContent/card/CardReview";
import CardNoTrailer from "../../components/listContent/card/CardNoTrailer";
import CardSimplePerson from "../../components/listContent/card/CardSimplePerson";
import IconMovie from "../../components/icons/IconMovie";
import IconComment from "../../components/icons/IconComment";
import IconPeople from "../../components/icons/IconPeople";
import { cinemaAPI } from "../../services/api";
import { useState } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const movieId = context.params.movieId;
  const movie = await cinemaAPI.get(`/movies/${movieId}`);

  return {
    props: {
      detailMovie: movie.data.data,
    },
  };
}

export default function DetailMoviePage(props) {
  const { detailMovie } = props;
  const router = useRouter();

  const [indexTrailer, setIndexTrailer] = useState(null);

  const [showReviews, setShowReviews] = useState(false);

  const listContent = [
    {
      title: "Recommended Movies",
      icon: <IconMovie />,
      data: detailMovie.recommendations,
    },
    {
      title: "Similar Movies",
      icon: <IconMovie />,
      data: detailMovie.similar,
    },
  ];

  const [selectedMedia, setSelectedMedia] = useState({
    list: [
      {
        title: "Trailers",
        isActive: true,
      },
      {
        title: "Backdrops",
        isActive: false,
      },
      {
        title: "Posters",
        isActive: false,
      },
    ],
  });

  const handleSelectedMedia = (index) => {
    let newSelected = selectedMedia.list.map((el) => {
      el.isActive = false;
      return el;
    });
    newSelected[index].isActive = true;
    setSelectedMedia({
      list: newSelected,
    });
    setIndexTrailer(null);
  };

  const goDetail = (e) => {
    router.push(`/movies/${e.id}`);
    setIndexTrailer(null);
    setShowReviews(false);
  };

  const selectedTrailer = (index) => {
    window.scrollTo(0, 0);
    setIndexTrailer(index);
  };

  return (
    <Layout title="Detail Movie">
      <DetailHeader
        dataHeader={detailMovie}
        indexTrailer={indexTrailer}
        onCloseTrailer={() => setIndexTrailer(null)}
      ></DetailHeader>

      <hr className="border-b-4 border-gray-500 shadow-2xl" />

      <section id="list-content">
        <div className="p-4 sm:p-6 md:p-8 lg-p-10 transform transition-all duration-500 bg-gray-100 dark:bg-black text-black dark:text-white">
          <ContentBox title={"Top Billed Cast"} icon={<IconPeople />}>
            {detailMovie.credits.cast.length > 0 ? (
              detailMovie.credits.cast
                .map((credit, index) => {
                  return (
                    <CardSimplePerson
                      key={index}
                      dataContent={credit}
                      onHandleClick={(e) => console.log(e)}
                    />
                  );
                })
                .slice(0, 10)
            ) : (
              <CardNoTrailer title={"No Have Caster"} />
            )}
          </ContentBox>

          <ContentBoxReview title={"Reviews"} icon={<IconComment />}>
            <div
              className={`flex justify-center text-xs sm:text-sm md:text-base lg:text-lg ${
                showReviews ? "mb-3" : "mb-0"
              }`}
            >
              <button
                onClick={() => setShowReviews(!showReviews)}
                className="text-black dark:text-white hover:text-primary dark:hover:text-primary rounded-md py-2 px-2 sm:px-4 lg:px-6 focus:outline-none"
              >
                <span>
                  {!showReviews ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 11l7-7 7 7M5 19l7-7 7 7"
                      />
                    </svg>
                  )}
                </span>
              </button>
            </div>
            {showReviews ? (
              detailMovie.reviews.length > 0 ? (
                detailMovie.reviews.map((review, index) => {
                  return (
                    <CardReview
                      key={index}
                      review={review}
                      reviewLength={detailMovie.reviews.length}
                      indexContent={index}
                    />
                  );
                })
              ) : (
                <div className="flex justify-center text-xs sm:text-sm md:text-base font-bold">
                  <span>No Have Review</span>
                </div>
              )
            ) : (
              ""
            )}
          </ContentBoxReview>

          <ContentBoxMedia
            title={"Media"}
            listSelected={selectedMedia.list}
            onSelectedMedia={(e) => handleSelectedMedia(e)}
          >
            {selectedMedia.list[0].isActive ? (
              detailMovie.video.length > 0 ? (
                detailMovie.video.map((vid, index) => {
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
              )
            ) : selectedMedia.list[1].isActive ? (
              detailMovie.images.backdrops.length > 0 ? (
                detailMovie.images.backdrops
                  .map((img, index) => {
                    return (
                      <CardMedia
                        key={index}
                        media={"backdrops"}
                        dataContent={img}
                      />
                    );
                  })
                  .slice(0, 10)
              ) : (
                <CardNoTrailer title={"No have backdrops"} />
              )
            ) : selectedMedia.list[2].isActive ? (
              detailMovie.images.posters.length > 0 ? (
                detailMovie.images.posters
                  .map((img, index) => {
                    return (
                      <CardMedia
                        key={index}
                        media={"posters"}
                        dataContent={img}
                      />
                    );
                  })
                  .slice(0, 10)
              ) : (
                <CardNoTrailer title={"No have posters"} />
              )
            ) : (
              ""
            )}
          </ContentBoxMedia>

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
      <hr className="border-b-4 border-gray-500 shadow-2xl" />
    </Layout>
  );
}
