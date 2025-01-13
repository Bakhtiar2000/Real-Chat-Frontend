import { io } from "socket.io-client";
import { addMessage } from "../redux/features/message/messageSlice"; // Redux action for new messages
import { store } from "../redux/store";

const socket = io("http://localhost:5000");

export const subscribeToMessages = (userId: string) => {
    socket.on("newMessage", (newMessage: any) => {
        if (newMessage.senderId === userId) {
            store.dispatch(addMessage(newMessage));
        }
    });
};

export const unsubscribeFromMessages = () => {
    socket.off("newMessage");
};

export default socket;
