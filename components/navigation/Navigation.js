import MainButton from "../buttons/MainButton";
import LogoText from "../icons/LogoText";
import DarkMode from "../buttons/DarkMode";

function MobileNavigation() {
  return (
    <nav>
      <div>main</div>
      <div></div>
      <div></div>
      <div></div>
    </nav>
  );
}

function MainNavigation() {
  return (
    <nav className="bg-transparent absolute z-50 w-full">
      <div className="p-4 md:px-8 lg:px-12 flex justify-between items-center">
        <div className="w-2/12">
          <LogoText className="text-2xl sm:text-4xl lg:text-5xl" />
        </div>
        <div>
          <ul className="flex items-center justify-center">
            <li>
              <DarkMode className="mr-5 md:mr-14" />
            </li>
            <li>
              <MainButton className="p-1 text-xs sm:p-2 sm:text-sm lg:px-4 lg:text-lg">
                Sign In
              </MainButton>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { MainNavigation, MobileNavigation };
