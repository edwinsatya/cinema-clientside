import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  changeDark,
  changeLight,
  theme,
  showDropDownNav as showDropDownNavAtom,
} from "../../store";

export default function DarkMode(props) {
  const changeThemeToDark = useSetRecoilState(changeDark);
  const changeThemeToLight = useSetRecoilState(changeLight);
  const themeNow = useRecoilValue(theme);
  const showDropDownNav = useRecoilValue(showDropDownNavAtom);

  const activeClassDark = "ring ring-sky-800";
  const activeClassAnimationDark = "animate-wiggle";
  const activeClassLight = "ring ring-yellow-300";
  const activeClassAnimationLight = "animate-spin-slow";

  const changeTheme = (value) => {
    const html = document.querySelector("html");
    localStorage.setItem("theme", value);
    html.classList.add(value);
    if (value === "dark") {
      changeThemeToDark();
      html.classList.remove("light");
    } else {
      changeThemeToLight();
      html.classList.remove("dark");
    }
  };

  return (
    <div className={`flex items-center justify-center ${props.className}`}>
      <button
        onClick={() => changeTheme("dark")}
        className={`${
          themeNow === "dark" ? activeClassDark : ""
        } mr-1 rounded-lg focus:outline-none focus:ring focus:ring-sky-800`}
      >
        <svg
          className={`${
            themeNow === "dark" ? activeClassAnimationDark : ""
          } lg:text-white  ${
            showDropDownNav ? "text-black dark:text-white" : "text-white"
          } transform h-6 w-6 lg:h-7 lg:w-7 hover:animate-wiggle focus:animate-wiggle`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          ></path>
        </svg>
      </button>
      <button
        onClick={() => changeTheme("light")}
        className={`${
          themeNow === "light" ? activeClassLight : ""
        } ml-1 rounded-lg focus:outline-none focus:ring focus:ring-yellow-300`}
      >
        <svg
          className={`${
            themeNow === "light" ? activeClassAnimationLight : ""
          } text-yellow-300 h-6 w-6 lg:h-7 lg:w-7 hover:animate-spin-slow focus:animate-spin-slow`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          ></path>
        </svg>
      </button>
    </div>
  );
}
