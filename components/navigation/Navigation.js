import MainButton from "../buttons/MainButton";
import DarkMode from "../buttons/DarkMode";
import IconBurger from "../icons/IconBurger";
import IconClose from "../icons/IconClose";
import ButtonLogo from "../buttons/ButtonLogo";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

function MainNavigation() {
  const router = useRouter();
  const listMenu = [
    {
      title: "Home",
      url: "/home",
    },
    {
      title: "Movies",
      url: "/movies",
    },
    {
      title: "Tv Shows",
      url: "/tv-shows",
    },
    {
      title: "Person",
      url: "/person",
    },
    {
      title: "Discussions",
      url: "/discussions",
    },
  ];
  const [dropDown, setDropDown] = useState(false);
  const classActive =
    "bg-white border border-black dark:bg-gray-700 dark:border-white";

  const classHover = `border-b-2 border-transparent hover:border-primary `;

  return (
    <nav className="flex flex-col">
      <div className="relative w-full">
        <div
          className={`absolute ${
            !dropDown
              ? "bg-transparent"
              : "bg-white dark:bg-black lg:bg-transparent lg:dark:bg-transparent border-b-2 border-black lg:border-transparent dark:border-white lg:dark:border-transparent"
          }  z-50 w-full`}
        >
          <div className="p-4 md:px-8 lg:px-12 flex justify-between items-center">
            <div className="w-2/12">
              <Link href="/" passHref>
                <ButtonLogo />
              </Link>
            </div>
            <div
              className={`w-6/12 xl:mr-auto ml-10 hidden ${
                router.pathname === "/" ? "hidden" : "lg:flex"
              }`}
            >
              <ul className="flex items-center justify-around text-sm sm:text-md lg:text-xl text black dark:text-white">
                {listMenu.map((menu, index) => {
                  return (
                    <li
                      key={index}
                      className={`${
                        router.pathname === menu.url ? "" : classHover
                      } ${
                        router.pathname === menu.url ? classActive : ""
                      } cursor-pointer rounded-md px-3 py-1 mx-1`}
                    >
                      <Link href={menu.url}>
                        <a>{menu.title}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <ul className="flex items-center justify-center">
                <li>
                  <DarkMode className="mr-5 md:mr-14" />
                </li>
                <li className="hidden lg:flex">
                  <MainButton
                    className="p-1 text-xs sm:p-2 sm:text-sm lg:px-4 lg:text-md bg-gradient-to-br rounded-sm shadow transform from-sky-400  
      to-primary hover:from-sky-400 hover:to-sky-500"
                  >
                    Sign In
                  </MainButton>
                </li>
                <li
                  onClick={() => setDropDown(!dropDown)}
                  className="lg:hidden text-black dark:text-white"
                >
                  {!dropDown ? <IconBurger /> : <IconClose />}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {dropDown && (
        <div className="relative w-full top-16 lg:hidden">
          <div className="absolute z-50 bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90 text-black dark:text-white w-full h-screen">
            <div className="p-4">
              <ul
                className={` ${
                  router.pathname === "/" ? "hidden" : "lg:flex"
                } flex flex-col items-center justify-around text-sm sm:text-md lg:text-xl text black dark:text-white`}
              >
                {listMenu.map((menu, index) => {
                  return (
                    <li
                      key={index}
                      className={`${
                        router.pathname === menu.url ? "" : classHover
                      } ${
                        router.pathname === menu.url ? classActive : ""
                      } cursor-pointer rounded-md px-3 py-1 mx-1 w-full`}
                    >
                      <Link href={menu.url}>
                        <a>{menu.title}</a>
                      </Link>
                    </li>
                  );
                })}
                <li className="bg-red-500 w-full mt-10">
                  <MainButton
                    className="p-1 text-xs sm:p-2 sm:text-sm lg:px-4 lg:text-md bg-gradient-to-br rounded-sm shadow transform from-sky-400  
      to-primary hover:from-sky-400 hover:to-sky-500"
                  >
                    Sign Out
                  </MainButton>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export { MainNavigation };
