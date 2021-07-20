import { io } from "socket.io-client";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const socket = io(publicRuntimeConfig.hostUrl);
export default function DiscussionsPage() {
  socket.on("newDiscussion", () => {
    console.log("triger new discuss");
  });
  return <div>LIST DISCUSSION</div>;
}
