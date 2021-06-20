import { atom, selector } from "recoil";

const theme = atom({
  key: "v-t",
  default: "",
});

const changeDark = selector({
  key: "c-t-1",
  set: ({ set }) => set(theme, (currTheme) => "dark"),
});

const changeLight = selector({
  key: "c-t-2",
  set: ({ set }) => set(theme, (currTheme) => "light"),
});

export { theme, changeDark, changeLight };
