export default function VideoContent({ content }) {
  return (
    <div className="w-full h-96 lg:w-6/12 flex justify-center items-center">
      <div
        className={`ring-4 ring-black dark:ring-gray-900 rounded-lg overflow-hidden shadow-2xl transform ${
          content.isFirst ? "-rotate-6" : "rotate-6"
        } hover:rotate-0 hover:shadow-lg hover:scale-110 transition-all duration-300`}
      >
        <video
          src={content.url}
          autoPlay={true}
          muted={true}
          loop={true}
          type="video/mp4"
        ></video>
      </div>
    </div>
  );
}
