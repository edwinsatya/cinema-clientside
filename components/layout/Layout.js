import Head from "next/head";
import Footer from "../footer/Footer";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { changeDark, changeLight } from "../../store";

export default function Layout(props) {
  const changeThemeToDark = useSetRecoilState(changeDark);
  const changeThemeToLight = useSetRecoilState(changeLight);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      changeThemeToDark();
    } else {
      document.documentElement.classList.remove("dark");
      changeThemeToLight();
    }

    localStorage.removeItem("theme");
  }, []);

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>

      <div>{props.children}</div>

      <Footer />
    </>
  );
}
