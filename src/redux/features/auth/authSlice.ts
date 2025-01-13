import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Socket } from "socket.io-client";

export type TUser = {
  email: string;
  userId: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  authUser: null | TUser;
  onlineUsers: string[];
  token: null | string;
  socket: null | Socket;
};

const initialState: TAuthState = {
  authUser: null,
  onlineUsers: [],
  token: null,
  socket: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.authUser = user;
      state.token = token;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    clearSocket: (state) => {
      state.socket = null;
    },
    logout: (state) => {
      state.authUser = null;
      state.token = null;
      state.socket = null;
    },
  },
});

export const { setUser, setOnlineUsers, setSocket, clearSocket, logout } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.authUser;
export const useOnlineUsers = (state: RootState) => state.auth.onlineUsers;
export const useSocket = (state: RootState) => state.auth.socket;
