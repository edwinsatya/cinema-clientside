export default function CardNoTrailer(props) {
  const { title } = props;
  return (
    <div className="relative w-60 h-36 sm:w-64 sm:h-40 md:w-72 md:h-44 lg:w-80 lg:h-48 rounded-lg shadow-xl drop-shadow-lg mx-3 my-2 ring-4 ring-black transform dark:ring-gray-900 text-center font-semibold text-xl flex justify-center items-center">
      <span>{title}</span>
    </div>
  );
}
