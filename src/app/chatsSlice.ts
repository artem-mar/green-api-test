/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';

export type Chat = {
  'id': string;
  'name'?: string;
};

type State = {
  currentChatId: string | null;
  chats: Chat[];
};

export const chatsAdapter = createEntityAdapter();
const initialState: State = {
  currentChatId: null,
  chats: [],
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = [...action.payload, ...state.chats];
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats = [action.payload, ...state.chats];
    },
    setCurrentChat: (state, action: PayloadAction<string>) => {
      state.currentChatId = action.payload;
    },
  },
});

export default chatsSlice.reducer;
export const { addChat, addChats, setCurrentChat } = chatsSlice.actions;
