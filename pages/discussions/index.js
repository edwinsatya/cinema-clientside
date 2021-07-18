import { io } from "socket.io-client";

const socket = io("http://localhost:3100");
export default function DiscussionsPage() {
  socket.on("newDiscussion", () => {
    console.log("triger new discuss");
  });
  return <div>LIST DISCUSSION</div>;
}
