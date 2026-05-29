import { io } from "socket.io-client"

const socket = io("http://127.0.0.1:8000", {
  path: "/socket.io",
  transports: ["websocket"],
  autoConnect: true
});
export default socket