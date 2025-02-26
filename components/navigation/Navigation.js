import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  currentUser as currentUserAtom,
  showDropDownNav as showDropDownNavAtom,
} from "../../store";
import ButtonLogo from "../buttons/ButtonLogo";
import DarkMode from "../buttons/DarkMode";
import MainButton from "../buttons/MainButton";
import IconBurger from "../icons/IconBurger";
import IconClose from "../icons/IconClose";

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
      title: "Actress",
      url: "/persons",
    },
    // {
    //   title: "Discussions",
    //   url: "/discussions",
    // },
  ];

  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const setShowDropDownNav = useSetRecoilState(showDropDownNavAtom);

  const [dropDown, setDropDown] = useState(false);

  const classActive = "border text-white bg-gray-700 border-white";

  const classHover = `border-b-2 border-transparent hover:border-primary `;

  const handleLoginLogout = async () => {
    // if (!currentUser) {
    //   router.push("/login");
    // } else {
    //   await cinemaAPI.patch("/users/logout", null, {
    //     headers: {
    //       token: localStorage.getItem("token"),
    //     },
    //   });
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("userId");
    //   router.push("/");
    //   setCurrentUser("");
    // }
    if (!currentUser) {
      router.push("/");
    } else {
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      setCurrentUser("");
    }
  };

  useEffect(() => {
    setShowDropDownNav(dropDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropDown]);

  return (
    <nav className="flex flex-col">
      <div className="relative w-full">
        <div
          className={`absolute ${
            !dropDown
              ? "bg-transparent"
              : "bg-white dark:bg-black lg:bg-transparent lg:dark:bg-transparent border-b-2 border-black lg:border-transparent dark:border-white lg:dark:border-transparent"
          }  z-40 w-full`}
        >
          <div className="flex items-center justify-between p-4 md:px-8 lg:px-12">
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
              <ul className="flex items-center justify-around text-sm text-white sm:text-base lg:text-lg">
                {listMenu.map((menu, index) => {
                  return (
                    <Link key={index} href={menu.url} passHref>
                      <li
                        className={`${
                          router.pathname === menu.url ? "" : classHover
                        } ${
                          router.pathname === menu.url ? classActive : ""
                        } cursor-pointer rounded-md px-3 py-1 mx-1`}
                      >
                        <a>{menu.title}</a>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
            <div>
              <ul className="flex items-center justify-center">
                {/* <li
                  className={`${
                    router.asPath !== "/" ? "inline-block" : "hidden"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`lg:text-white  ${
                      dropDown ? "text-black dark:text-white" : "text-white"
                    } cursor-pointer mr-3 transform h-6 w-6 lg:h-7 lg:w-7 hover:animate-wiggle focus:animate-wiggle`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li> */}
                <li>
                  <DarkMode className="mr-2 md:mr-4" />
                </li>
                <li className="hidden lg:flex">
                  {currentUser && (
                    <MainButton
                      handleClick={() => handleLoginLogout()}
                      className={`p-1 text-xs sm:p-2 sm:text-sm lg:px-3 lg:text-sm bg-gradient-to-br rounded-sm shadow transform ${
                        !currentUser
                          ? "from-sky-400 to-primary hover:from-sky-400 hover:to-sky-500"
                          : "from-yellow-600 to-yellow-800 hover:from-yellow-500 hover:to-yellow-600"
                      }`}
                    >
                      {!currentUser ? "IntroPage" : "Clear Name"}
                    </MainButton>
                  )}
                </li>
                <li
                  onClick={() => setDropDown(!dropDown)}
                  className={`lg:hidden ${
                    dropDown ? "text-black dark:text-white" : "text-white"
                  }`}
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
          <div className="absolute z-50 w-full h-screen text-black bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90 dark:text-white">
            <div className="p-4">
              <ul
                className={`flex flex-col items-center justify-around text-sm sm:text-base lg:text-xl text black dark:text-white`}
              >
                {listMenu.map((menu, index) => {
                  return (
                    <Link key={index} href={menu.url} passHref>
                      <li
                        className={`${
                          router.pathname === menu.url ? "" : classHover
                        } ${
                          router.pathname === menu.url ? classActive : ""
                        } cursor-pointer rounded-md px-3 py-1 mx-1 w-full
                      ${router.pathname === "/" && !currentUser ? "hidden" : ""}
                      `}
                      >
                        <a>{menu.title}</a>
                      </li>
                    </Link>
                  );
                })}
                <li className={`w-full ${currentUser ? "mt-10" : ""}`}>
                  {currentUser && (
                    <MainButton
                      handleClick={() => handleLoginLogout()}
                      className={`p-1 text-xs sm:p-2 sm:text-sm lg:px-4 lg:text-base bg-gradient-to-br rounded-sm shadow transform ${
                        !currentUser
                          ? "from-sky-400 to-primary hover:from-sky-400 hover:to-sky-500"
                          : "from-yellow-600 to-yellow-800 hover:from-yellow-500 hover:to-yellow-600"
                      }`}
                    >
                      {!currentUser ? "IntroPage" : "Clear Name"}
                    </MainButton>
                  )}
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
