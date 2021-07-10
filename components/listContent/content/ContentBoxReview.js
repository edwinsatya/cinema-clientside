export default function ContentBoxReview(props) {
  return (
    <div>
      <div className="flex items-center">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
          {props.title}
        </h3>
        <div className="ml-3">{props.icon}</div>
      </div>
      <div className="p-3 lg:p-8">
        <div className="px-4 py-5 rounded-lg bg-gray-300 dark:bg-gray-800">
          <div className={`flex flex-col items-center`}>{props.children}</div>
        </div>
      </div>
    </div>
  );
}
