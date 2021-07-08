export default function CardAnyTrailer(props) {
  const { indexTrailer, videoKey, onClick } = props;

  return (
    <div className="relative w-80 h-48 rounded-lg shadow-xl drop-shadow-lg mx-3 my-2 ring-4 ring-black transform dark:ring-gray-900 flex-shrink-0 overflow-hidden">
      <div
        onClick={() => onClick(indexTrailer)}
        className={`absolute cursor-pointer transform transition-all top-0 left-0 w-full h-full z-50`}
      ></div>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoKey}?rel=0&disablekb=1&modestbranding=1&showinfo=0&controls=0&autohide=1`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}
