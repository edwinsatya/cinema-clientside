export default function VideoContent({ content }) {
  return (
    <div className="w-full h-96 lg:w-6/12 flex justify-center items-center">
      <div
        className={`flex justify-center items-center w-1/2 h-40 ring-4 ring-black dark:ring-gray-900 rounded-lg overflow-hidden shadow-2xl transform ${
          content.isFirst ? "-rotate-6" : "rotate-6"
        } hover:rotate-0 hover:shadow-lg hover:scale-110 transition-all duration-300`}
      >
        <div className="text-lg h-10 justify-center flex font-medium sm:text-xl lg:text-2xl mb-3 mt-3">
          Enjoy your stream!
        </div>
      </div>
    </div>
  );
}
