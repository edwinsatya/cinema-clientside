import { useRouter } from "next/router";

export default function Credits(props) {
  const { detailPerson } = props;
  const router = useRouter();

  const goDetail = (credit) => {
    if (credit.media_type === "movie") {
      router.push(`/movies/${credit.id}`);
    } else if (credit.media_type === "tv") {
      router.push(`/tv-shows/${credit.id}`);
    }
  };

  const getYear = (date) => {
    if (date !== "") {
      return date.substr(0, 4);
    }
    return (
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
          d="M18 12H6"
        />
      </svg>
    );
  };

  return (
    <div className="mt-3 shadow-xl">
      <div className="px-4 lg:px-0">
        <h3 className="text-base sm:text-lg font-semibold">Credits</h3>
      </div>
      <div className="flex mt-3 flex-col border-t-2 border-b-2 lg:border-r-2 lg:border-l-2 border-gray-200 dark:border-gray-800 lg:rounded-lg w-full">
        {detailPerson.credits.map((credit, index) => {
          let currentDate;
          let nextDate;
          if (credit.release_date || credit.first_air_date) {
            currentDate = credit.release_date || credit.first_air_date;
          } else {
            currentDate = "";
          }

          if (index != detailPerson.credits.length - 1) {
            if (
              detailPerson.credits[index + 1].release_date ||
              detailPerson.credits[index + 1].first_air_date
            ) {
              nextDate =
                detailPerson.credits[index + 1].release_date ||
                detailPerson.credits[index + 1].first_air_date;
            } else {
              nextDate = "";
            }
          } else {
            nextDate = "";
          }

          return (
            <div
              key={index}
              className={`${
                index != 0 &&
                index != detailPerson.credits.length - 1 &&
                getYear(currentDate) != getYear(nextDate)
                  ? "border-b-2 border-gray-200 dark:border-gray-800"
                  : ""
              } flex justify-center items-center p-4`}
            >
              <div className="w-2/12 lg:w-1/12 lg:text-center lg:flex lg:justify-center">
                {getYear(currentDate)}
              </div>
              <div className="w-1/12 hidden lg:flex lg:justify-center lg:items-center">
                <div className="border-4 border-gray-500 rounded-full h-3 w-3"></div>
              </div>
              <div className="w-10/12 flex lg:pl-4">
                <span
                  onClick={() => goDetail(credit)}
                  className="cursor-pointer hover:text-gray-400 dark:hover:text-gray-600"
                >
                  {credit.title || credit.name}
                </span>
                &nbsp;
                {credit.character && (
                  <span className="text-gray-400 hidden lg:flex">
                    as {credit.character}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
