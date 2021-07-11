import boxReviewStyle from "../../../styles/card.module.css";

export default function ContentBoxReview(props) {
  return (
    <div>
      <div className="flex items-center">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
          {props.title}
        </h3>
        <div className="ml-3">{props.icon}</div>
      </div>
      <div className="p-2 sm:p-4 lg:p-8">
        <div
          className={`${boxReviewStyle.contentBoxReview} overflow-y-scroll px-4 py-5 sm:px-6 rounded-lg bg-gray-300 dark:bg-gray-800`}
        >
          <div className={`flex flex-col w-full`}>{props.children}</div>
        </div>
      </div>
    </div>
  );
}
