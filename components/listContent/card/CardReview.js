import Image from "next/image";

export default function CardReview(props) {
  const { review, reviewLength, indexContent } = props;

  return (
    <>
      <div className="my-2 text-xs sm:text-sm lg:text-lg flex flex-col lg:flex-row lg:items-center">
        <div className="hidden mb-2 sm:flex sm:items-center lg:flex-col lg:w-2/12">
          <div className="relative mr-2 lg:mr-0 lg:mb-3 h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14 rounded-md overflow-hidden">
            <Image
              src={`${
                review.author_details.avatar_path.substr(0, 4) == "/htt"
                  ? review.author_details.avatar_path.substr(1)
                  : review.author_details.avatar_path.substr(0, 4) == "http"
                  ? review.author_details.avatar_path
                  : `https://image.tmdb.org/t/p/original` +
                    review.author_details.avatar_path
              }`}
              layout={"fill"}
              objectFit={"fill"}
              quality={100}
              alt="list"
            />
          </div>
          <span>{review.author}</span>
        </div>

        <div
          className={`bg-white dark:bg-gray-900  p-2 whitespace-normal overflow-y-scroll h-10 sm:h-16 lg:h-20 rounded-md lg:w-9/12`}
        >
          {review.content}
        </div>
      </div>
      {indexContent + 1 != reviewLength && (
        <hr className="border-b my-1 sm:my-4 lg:my-6 w-full border-white dark:border-gray-900 shadow-2xl" />
      )}
    </>
  );
}
