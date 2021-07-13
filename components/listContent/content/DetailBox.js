import getDateStr from "../../../utils/function/getDateStr";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

export default function DetailBoxMovie(props) {
  const { detail } = props;

  return (
    <div className="flex flex-col bg-gray-200 rounded-lg ring ring-black dark:bg-gray-900 dark:ring-gray-800 p-2 sm:p-4 lg:p-6">
      <div className="flex">
        <span className=" sm:w-2/12">Title</span>
        <span>:</span>
        <span className="sm:ml-2 sm:w-7/12 uppercase text-gray-500">
          {detail.title || detail.name || "-"}
        </span>
      </div>
      <div className="flex">
        <span className=" sm:w-2/12">Original Title</span>
        <span>:</span>
        <span className="sm:ml-2 sm:w-7/12 uppercase">
          {detail.original_title || detail.original_name || "-"}
        </span>
      </div>
      <div className="flex">
        <span className=" sm:w-2/12">Original Language</span>
        <span>:</span>
        <span className="sm:ml-2 sm:w-7/12 text-xl">
          {detail.original_language
            ? getUnicodeFlagIcon(
                detail.original_language.toUpperCase() == "JA"
                  ? "JP"
                  : detail.original_language.toUpperCase() == "EN"
                  ? "US"
                  : detail.original_language
              )
            : "-"}
        </span>
      </div>
      <div className="flex">
        <span className=" sm:w-2/12">Genres</span>
        <span>:</span>
        <span className="sm:ml-2 sm:w-7/12">
          {detail.genres.map((genre) => genre.name).join(", ") || "-"}
        </span>
      </div>
      <div className="flex">
        <span className=" sm:w-2/12">Status</span>
        <span>:</span>
        <span className="sm:ml-2 sm:w-7/12 text-gray-500">
          {detail.status || "-"}
        </span>
      </div>
      <div className="flex">
        <span className=" sm:w-2/12">Production</span>
        <span>:</span>
        <span className="sm:ml-2 sm:w-7/12">
          {detail.production_companies
            .map((companie) => companie.name)
            .join(", ") || "-"}
        </span>
      </div>
      <div className="flex">
        <span className=" sm:w-2/12">Realease On</span>
        <span>:</span>
        <span className="sm:ml-2 sm:w-7/12">
          {detail.release_date
            ? `${getDateStr(detail.release_date)}`
            : `${getDateStr(detail.first_air_date)}`}
        </span>
      </div>
      <div className="flex">
        <span className=" sm:w-2/12">End On</span>
        <span>:</span>
        <span className="sm:ml-2 sm:w-7/12">
          {detail.last_air_date ? `${getDateStr(detail.last_air_date)}` : `-`}
        </span>
      </div>
      <div className="flex">
        <span className=" sm:w-2/12">Total Episodes</span>
        <span>:</span>
        <span className="sm:ml-2 sm:w-7/12">
          {detail.number_of_episodes || "-"}
        </span>
      </div>
      <div className="flex">
        <span className=" sm:w-2/12">Total Seasons</span>
        <span>:</span>
        <span className="sm:ml-2 sm:w-7/12">
          {detail.number_of_seasons || "-"}
        </span>
      </div>
      <div className="flex">
        <span className=" sm:w-2/12">Home Page</span>
        <span>:</span>
        {detail.homepage ? (
          <a
            className="text-sm md:text-md lg:text-md sm:ml-2 sm:w-7/12 underline text-blue-600"
            href={detail.homepage}
            rel="noreferrer"
            target="_blank"
          >
            {detail.homepage}
          </a>
        ) : (
          <span className="sm:ml-2 sm:w-7/12">-</span>
        )}
      </div>
    </div>
  );
}
