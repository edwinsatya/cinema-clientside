import Layout from "../../components/layout/Layout";
import DetailHeader from "../../components/header/DetailHeader";
import ContentBox from "../../components/listContent/content/ContentBox";
import CardAnyTrailer from "../../components/listContent/card/CardAnyTrailer";
import CardNoTrailer from "../../components/listContent/card/CardNoTrailer";
import { cinemaAPI } from "../../services/api";
import { useRouter } from "next/router";
import { useState } from "react";

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
  const [indexTrailer, setIndexTrailer] = useState(null);
  const router = useRouter();

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
              <CardNoTrailer />
            )}
          </ContentBox>
        </div>
      </section>
    </Layout>
  );
}
