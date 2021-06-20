import DarkMode from "../../buttons/DarkMode";

export default function TextContent({ content }) {
  return (
    <div className="w-full lg:w-6/12 lg:pr-4 flex flex-col justify-center items-center text-center lg:text-left">
      <h2 className="text-3xl w-full sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
        {content.title}
      </h2>
      <h3 className="text-xl w-full font-light sm:text-3xl mt-6">
        {content.subTitle}
      </h3>
      {content.darkMode && (
        <div className="w-1/4 rounded-xl mt-14 ring ring-black dark:ring-white shadow-xl flex justify-center items-center p-4">
          <DarkMode />
        </div>
      )}
    </div>
  );
}
