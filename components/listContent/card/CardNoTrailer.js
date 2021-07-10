export default function CardNoTrailer(props) {
  const { title } = props;
  return (
    <div className="relative w-80 h-48 rounded-lg shadow-xl drop-shadow-lg mx-3 my-2 ring-4 ring-black transform dark:ring-gray-900 text-center font-semibold text-xl flex justify-center items-center">
      <span>{title}</span>
    </div>
  );
}
