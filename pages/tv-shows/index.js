import { useRouter } from "next/router";

export default function TvShowsPage(props) {
  const { tvShows } = props;
  const router = useRouter();

  return (
    <div>
      <h2 className="text-green-700 text-2xl antialiased">List Tv Show</h2>
      <ul>
        {tvShows.map((tv, index) => {
          return (
            <li onClick={() => router.push(`/tv-shows/${tv.id}`)} key={index}>
              {tv.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const host = process.env.HOST;
  const response = await fetch(`${host}/api/tv`);
  const tvShows = await response.json();

  return {
    props: {
      tvShows: tvShows.data.results,
    },
  };
}
