import Layout from "../../components/layout/Layout";
import DetailHeader from "../../components/header/DetailHeader";
import ContentBox from "../../components/listContent/content/ContentBox";
import ContentBoxReview from "../../components/listContent/content/ContentBoxReview";
import CardAnyTrailer from "../../components/listContent/card/CardAnyTrailer";
import Card from "../../components/listContent/card/Card";
import CardReview from "../../components/listContent/card/CardReview";
import CardNoTrailer from "../../components/listContent/card/CardNoTrailer";
import IconMovie from "../../components/icons/IconMovie";
import IconComment from "../../components/icons/IconComment";
import { cinemaAPI } from "../../services/api";
import { useState } from "react";
import { useRouter } from "next/router";

// export async function getStaticPaths() {
//   const [
//     listDiscover,
//     listNowPlaying,
//     listPopular,
//     listTopRated,
//     listUpcoming,
//   ] = await Promise.all([
//     cinemaAPI.get(`/movies`),
//     cinemaAPI.get(`/movies/now-playing`),
//     cinemaAPI.get(`/movies/popular`),
//     cinemaAPI.get(`/movies/top-rated`),
//     cinemaAPI.get(`/movies/upcoming`),
//   ]);

//   const arr1 = listDiscover.data.data.results;
//   const arr2 = listNowPlaying.data.data.results;
//   const arr3 = listPopular.data.data.results;
//   const arr4 = listTopRated.data.data.results;
//   const arr5 = listUpcoming.data.data.results;

//   const listMovie = arr1.concat(arr2, arr3, arr4, arr5);

//   const paths = listMovie.map((movie) => {
//     return {
//       params: {
//         movieId: String(movie.id),
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps(context) {
//   const movieId = context.params.movieId;
//   const movie = await cinemaAPI.get(`/movies/${movieId}`);

//   return {
//     props: {
//       detailMovie: movie.data.data,
//     },
//   };
// }

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
          <ContentBox title={"List Trailer :"}>
            {detailMovie.video.length > 0 ? (
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
                className="bg-gray-700 text-white hover:bg-gray-500 dark:bg-white dark:text-black dark:hover:bg-gray-500 rounded-md py-2 px-2 sm:px-4 lg:px-6 focus:outline-none"
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
      <hr className="border-b-4 border-gray-500 shadow-2xl" />
    </Layout>
  );
}
