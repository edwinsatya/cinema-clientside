import { atom, selector, selectorFamily } from "recoil";

const theme = atom({
  key: "v-t",
  default: "",
});

const currentUser = atom({
  key: "user-state",
  default: "",
});

const preRegister = atom({
  key: "pre-register",
  default: "",
});

const showDropDownNav = atom({
  key: "status-dropdown",
  default: false,
});

const changeDark = selector({
  key: "c-t-1",
  set: ({ set }) => set(theme, (currTheme) => (currTheme = "dark")),
});

const changeLight = selector({
  key: "c-t-2",
  set: ({ set }) => set(theme, (currTheme) => (currTheme = "light")),
});

export {
  theme,
  changeDark,
  changeLight,
  currentUser,
  preRegister,
  showDropDownNav,
};
