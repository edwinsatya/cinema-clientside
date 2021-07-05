import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { changeDark, changeLight } from "../../store";

export default function AuthMode(props) {
  const changeThemeToDark = useSetRecoilState(changeDark);
  const changeThemeToLight = useSetRecoilState(changeLight);

  useEffect(() => {
    localStorage.removeItem("theme");

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
  }, []);

  return <>{props.children}</>;
}
