import Axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const cinemaAPI = Axios.create({
  baseURL: publicRuntimeConfig.backendUrl,
});
