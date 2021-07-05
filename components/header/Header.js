import { MainNavigation } from "../../components/navigation/Navigation";

export default function Header(props) {
  return (
    <header>
      <MainNavigation />
      <div className="relative" style={{ height: "90vh" }}>
        <div className="absolute w-full" style={{ height: "90vh" }}>
          {props.children}
        </div>
        <div className="absolute transform transition-all top-0 left-0 w-full h-full z-10 bg-gradient-to-b from-gray-300 dark:from-black via-transparent dark:via-transparent to-gray-300 dark:to-black opacity-30 duration-500"></div>
        {/* <div className="absolute h-full text-center text-black dark:text-white transition-colors duration-500 flex justify-center items-center p-4 md:px-8 lg:px-12 z-10 w-full">
            <div className="max-w-xl relative h-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
                Unlimited Trailer movies, TV shows, and more.
              </h1>
              <h2 className="text-2xl font-medium sm:text-3xl lg:text-4xl mb-3 mt-3">
                Watch anywhere. Watch anytime.
              </h2>
            </div>
          </div> */}
      </div>
    </header>
  );
}
