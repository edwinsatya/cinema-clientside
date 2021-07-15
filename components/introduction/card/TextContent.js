import DarkMode from "../../buttons/DarkMode";

export default function TextContent({ content }) {
  return (
    <div className="w-full my-5 lg:my-0 lg:w-6/12 lg:pr-4 flex flex-col justify-center items-center text-center lg:text-left">
      <h2 className="w-full text-xl sm:text-2xl md:text-3xl lg:text-6xl font-semibold">
        {content.title}
      </h2>
      <h3 className="text-xl w-full font-light sm:text-3xl mt-6">
        {content.subTitle}
      </h3>
      {content.darkMode && (
        <div className="w-1/4 rounded-xl bg-gray-200 dark:bg-transparent mt-14 ring ring-black dark:ring-white shadow-xl flex justify-center items-center p-4">
          <DarkMode />
        </div>
      )}
    </div>
  );
}
