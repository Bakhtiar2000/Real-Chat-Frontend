import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    name: "messages",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<any[]>) => {
            state.users = action.payload;
        },
        setSelectedUser: (state, action: PayloadAction<any>) => {
            state.selectedUser = action.payload;
        },
        setMessages: (state, action: PayloadAction<any[]>) => {
            state.messages = action.payload;
        },
        addMessage: (state, action: PayloadAction<any>) => {
            state.messages.push(action.payload);
        },
    },
});

export const {
    setUsers,
    setSelectedUser,
    setMessages,
    addMessage,
} = messagesSlice.actions;

export default messagesSlice.reducer;
