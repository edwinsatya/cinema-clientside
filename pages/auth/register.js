import { useEffect, useState } from "react";

export default function Register() {
  const changeTheme = (value) => {
    localStorage.setItem("theme", value);
    const html = document.querySelector("html");
    html.classList.add(localStorage.getItem("theme"));

    if (value === "dark") {
      html.classList.remove("light");
    } else {
      html.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.removeItem("theme");
  }, []);

  return (
    <div className=" w-full h-screen flex justify-center items-center flex-col bg-gray-200 dark:bg-gray-700 dark:text-white">
      <div className="w-5/12 p-4 bg-white dark:bg-gray-800 flex justify-between rounded-xl">
        <div>Switcher</div>
        <div className="flex">
          <div
            onClick={() => changeTheme("light")}
            className="rounded-full w-5 h-5 bg-gray-300 mr-2"
          ></div>
          <div
            onClick={() => changeTheme("dark")}
            className="rounded-full w-5 h-5 bg-gray-900"
          ></div>
        </div>
      </div>

      <ul className="w-full h-32 p-4 bg-red-500 flex group">
        <li className="px-4 flex-none transform transition-transform duration-500 group">
          <div className="w-80 p-4 bg-white dark:bg-gray-800 rounded-xl mx-4 ">
            <div>
              <h2>Lorem ipsum dolor sit amet 1.</h2>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
