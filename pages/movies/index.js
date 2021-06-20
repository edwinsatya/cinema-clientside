import { useRouter } from "next/router";

export default function MoviesPage(props) {
  const { movies } = props;
  const router = useRouter();

  return (
    <div>
      <h2 className="text-green-700 text-2xl antialiased">List Movie</h2>
      <ul>
        {movies.map((movie, index) => {
          return (
            <li onClick={() => router.push(`/movies/${movie.id}`)} key={index}>
              {movie.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const host = process.env.HOST;
  const response = await fetch(`${host}/api/movies`);
  const movies = await response.json();

  return {
    props: {
      movies: movies.data.results,
    },
  };
}
