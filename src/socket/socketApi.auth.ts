import { io, Socket } from "socket.io-client";
import { setOnlineUsers } from "../redux/features/auth/authSlice";
import { store } from "../redux/store";

let socket: Socket | null = null;

export const connectSocket = (userId: string) => {
    if (socket && socket.connected) return;

    socket = io("http://localhost:5000", {
        query: {
            userId,
        },
    });

    socket.on("connect", () => {
        console.log("Connected to WebSocket server");
    });

    socket.on("getOnlineUsers", (userIds) => {
        store.dispatch(setOnlineUsers(userIds));
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
    });
};

export const disconnectSocket = () => {
    if (socket && socket.connected) {
        socket.disconnect();
    }
};
