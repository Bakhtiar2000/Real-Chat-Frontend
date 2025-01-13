import { io } from "socket.io-client";
import { setOnlineUsers, setSocket, useCurrentUser, useSocket, clearSocket } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addMessage, setSelectedUser, useSelectedUser } from "../redux/features/message/messageSlice";

const dispatch = useAppDispatch();

export const connectSocket = () => {
    const user = useAppSelector(useCurrentUser);
    const socket = useAppSelector(useSocket);

    if (!user || socket?.connected) return;

    const newSocket = io("http://localhost:5000", {
        query: {
            userId: user.userId,
        },
    });

    newSocket.connect();
    dispatch(setSocket(newSocket));

    newSocket.on("getOnlineUsers", (userIds) => {
        dispatch(setOnlineUsers(userIds));
    });
};

export const disconnectSocket = () => {
    ;
    const socket = useAppSelector(useSocket);

    if (socket?.connected) {
        socket.disconnect();
        dispatch(clearSocket());
    }
};

export const subscribeToMessages = () => {
    const selectedUser = useAppSelector(useSelectedUser);
    const socket = useAppSelector(useSocket);
    if (!selectedUser || !socket) return;

    socket.on("newMessage", (newMessage) => {
        const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
        if (!isMessageSentFromSelectedUser) return;
        else dispatch(addMessage(newMessage));
    });
};

export const unsubscribeFromMessages = () => {
    const socket = useAppSelector(useSocket);
    if (socket) {
        socket.off("newMessage");
    }
};

export const setSelectedUserInStore = (selectedUser: any) => {
    dispatch(setSelectedUser(selectedUser));
};