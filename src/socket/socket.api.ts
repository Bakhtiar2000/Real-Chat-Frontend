import { io } from "socket.io-client";
import {
    setOnlineUsers,
    setSocket,
    useCurrentUser,
    useSocket,
    clearSocket,
} from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addMessage, useSelectedUser } from "../redux/features/message/messageSlice";

export const connectSocket = (dispatch, user, socket) => {
    // const dispatch = useAppDispatch();
    if (!user || socket?.connected) return;

    const newSocket = io("http://localhost:5000", {
        path: '/socket.io',
        query: {
            userId: user.userId,
        },
    });

    newSocket.connect();
    dispatch(setSocket({ socket: newSocket }));

    newSocket.on("getOnlineUsers", (userIds) => {
        dispatch(setOnlineUsers({ onlineUsers: userIds }));
    });

    newSocket.on("newMessage", (newMessage) => {
        dispatch(addMessage({ messages: newMessage }));
    });
};

export const disconnectSocket = (dispatch, socket) => {
    if (socket?.connected) {
        socket.disconnect();
        dispatch(clearSocket());
    }
};

export const subscribeToMessages = (dispatch, selectedUser, socket) => {
    if (!selectedUser || !socket) return;

    socket.on("newMessage", (newMessage) => {
        const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
        if (isMessageSentFromSelectedUser) {
            dispatch(addMessage({ messages: newMessage }));
        }
    });
};

export const unsubscribeFromMessages = (socket) => {
    if (socket) {
        socket.off("newMessage");
    }
};
