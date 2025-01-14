import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface MessageState {
    messages: any[];
    users: any[];
    selectedUser: any | null;
}

const initialState: MessageState = {
    messages: [],
    users: [],
    selectedUser: null,
};

const messagesSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        removeSelectedUser: (state) => {
            state.selectedUser = null;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
});

export const {
    setUsers,
    setSelectedUser,
    removeSelectedUser,
    setMessages,
    addMessage,
} = messagesSlice.actions;
export default messagesSlice.reducer;

export const useMessages = (state: RootState) => state.message.messages;
export const useUsers = (state: RootState) => state.message.users;
export const useSelectedUser = (state: RootState) => state.message.selectedUser;
