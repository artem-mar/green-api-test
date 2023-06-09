/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';

export type Chat = {
  'id': string;
  'name'?: string;
};

type State = {
  currentChatId: string | null;
  entities: Chat[];
  ids: string[];
};

export const chatsAdapter = createEntityAdapter();
const initialState: State = {
  currentChatId: null,
  entities: [],
  ids: [],
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChats: (state, action: PayloadAction<Chat[]>) => {
      state.entities = [...action.payload, ...state.entities];
      state.ids = [...action.payload.map((ch) => ch.id), ...state.ids];
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      state.entities = [action.payload, ...state.entities];
      state.ids = [action.payload.id, ...state.ids];
    },
    setCurrentChat: (state, action: PayloadAction<string>) => {
      state.currentChatId = action.payload;
    },
  },
});

export default chatsSlice.reducer;
export const { addChat, addChats, setCurrentChat } = chatsSlice.actions;
