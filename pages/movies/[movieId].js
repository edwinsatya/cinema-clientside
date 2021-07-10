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
            {detailMovie.reviews.length > 0 ? (
              detailMovie.reviews.map((review, index) => {
                return (
                  <CardReview
                    key={index}
                    review={review}
                    reviewLength={detailMovie.reviews.length}
                    indexContent={index}
                  />
                  // <>
                  //   <div
                  //     key={index}
                  //     className="my-2 text-xs sm:text-sm lg:text-lg flex flex-col lg:flex-row lg:items-center"
                  //   >
                  //     <div className="hidden mb-2 sm:flex sm:items-center lg:flex-col lg:w-2/12">
                  //       <div className="relative mr-2 lg:mr-0 lg:mb-3 h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14 rounded-md overflow-hidden">
                  //         <Image
                  //           src={`${
                  //             review.author_details.avatar_path.substr(0, 4) ==
                  //             "/htt"
                  //               ? review.author_details.avatar_path.substr(1)
                  //               : review.author_details.avatar_path.substr(
                  //                   0,
                  //                   4
                  //                 ) == "http"
                  //               ? review.author_details.avatar_path
                  //               : `https://image.tmdb.org/t/p/original` +
                  //                 review.author_details.avatar_path
                  //           }`}
                  //           layout={"fill"}
                  //           objectFit={"fill"}
                  //           quality={100}
                  //           alt="list"
                  //         />
                  //       </div>
                  //       <span>{review.author}</span>
                  //     </div>

                  //     <div
                  //       className={`bg-white dark:bg-gray-900  p-2 whitespace-normal overflow-y-scroll h-10 sm:h-16 lg:h-20 rounded-md lg:w-9/12`}
                  //     >
                  //       {review.content}
                  //     </div>
                  //   </div>
                  //   {index + 1 != detailMovie.reviews.length && (
                  //     <hr className="border-b my-1 sm:my-4 lg:my-6 w-full border-white dark:border-gray-900 shadow-2xl" />
                  //   )}
                  // </CardReview>
                );
              })
            ) : (
              <div>
                <span>No Have Review</span>
              </div>
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
