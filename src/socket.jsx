import { io } from "socket.io-client";

const socket = io("http://18.204.175.233:3001", {
  autoConnect: false,
});
export default socket;
