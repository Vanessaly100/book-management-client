import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_PUBLIC_SOCKET_URL, {
  withCredentials: true,
  autoConnect: false,
  transports: ["websocket"],
});
socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
});

export default socket;
