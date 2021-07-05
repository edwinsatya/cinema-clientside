import Image from "next/image";

export default function DetailMoviePage(props) {
  const { movie } = props;
  return (
    <div>
      <h2>DETAIL MOVIE</h2>
      {/* <div className=" w-20 h-20 bg-red-500"></div>
      <div className="relative w-52 h-96  rounded-lg overflow-hidden transform hover:scale-150 transition-transform delay-100">
        <Image
          src={movie.backdrop_path}
          width={1000}
          height={600}
          quality={100}
          priority={true}
          sizes={500}
          alt="detail movie"
        />
      </div>

      <span>{movie.title}</span> */}
    </div>
  );
}

// export async function getStaticPaths() {
//   const host = process.env.HOST;
//   const response = await fetch(`${host}/api/movies`);
//   const movies = await response.json();

//   const paths = movies.data.results.map((movie) => {
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
//   const host = process.env.HOST;
//   const response = await fetch(`${host}/api/movies/${movieId}`);
//   const movie = await response.json();

//   return {
//     props: {
//       movie: movie.data,
//     },
//   };
// }
