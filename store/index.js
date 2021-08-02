import { atom, selector } from "recoil";

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

const countUserOnline = atom({
  key: "count-user-online",
  default: 0,
});

const listDiscussion = atom({
  key: "list-discussion",
  default: [],
});

const countChatNotRead = atom({
  key: "count-chat-not-read",
  default: 0,
});

const openChat = atom({
  key: "open-chat",
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
  countUserOnline,
  listDiscussion,
  countChatNotRead,
  openChat,
};
