import Axios from "axios";

export const cinemaAPI = Axios.create({
  baseURL: process.env.HOST,
});
