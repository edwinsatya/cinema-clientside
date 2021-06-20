import MainButton from "../buttons/MainButton";
import LogoText from "../icons/LogoText";
import DarkMode from "../buttons/DarkMode";

function MainNavigation() {
  return (
    <nav>
      <div>main</div>
      <div></div>
      <div></div>
      <div></div>
    </nav>
  );
}

function IntroNavigation() {
  return (
    <nav className="bg-transparent absolute z-50 w-full">
      <div className="p-4 md:px-8 lg:px-12 flex justify-between items-center">
        <div className="w-2/12">
          <LogoText />
        </div>
        <div className="flex items-center justify-center">
          <DarkMode className="mr-5 md:mr-14" />
          <MainButton className="p-1 text-xs sm:p-2 sm:text-sm lg:px-4 lg:text-lg">
            Sign In
          </MainButton>
        </div>
      </div>
    </nav>
  );
}

export { MainNavigation, IntroNavigation };
