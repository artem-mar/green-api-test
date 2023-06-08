/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';

export type Chat = {
  'id': string;
  'name'?: string;
};

export const chatsAdapter = createEntityAdapter();
// const initialState: Chat[] = [];

const chatsSlice = createSlice({
  name: 'chats',
  initialState: chatsAdapter.getInitialState({ currentChatId: '' }),
  reducers: {
    // addChats: (state, action: PayloadAction<Chat[]>) => {
    //   state.push(...action.payload);
    // },
    // addChat: (state, action: PayloadAction<Chat>) => {
    //   state = [...state, action.payload];
    // },
    addChat: chatsAdapter.addOne,
    addChats: chatsAdapter.addMany,
    setCurrentChat: (state, action: PayloadAction<string>) => {
      state.currentChatId = action.payload;
    },
  },
});

export default chatsSlice.reducer;
export const { addChat, addChats, setCurrentChat } = chatsSlice.actions;
