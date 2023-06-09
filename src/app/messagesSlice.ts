/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';

export type Message = {
  type: string;
  idMessage: string;
  typeMessage: string;
  chatId: string;
  textMessage?: string;
};

type State = {
  entities: Message[];
  ids: string[];
};

export const chatsAdapter = createEntityAdapter();
const initialState: State = {
  entities: [],
  ids: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, action: PayloadAction<Message[]>) => {
      const uniqueMessages = action.payload.filter((m) => !state.ids.includes(m.idMessage));
      state.entities = [...state.entities, ...uniqueMessages];
      state.ids = [...state.ids, ...uniqueMessages.map((m) => m.idMessage)];
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const isUnique = !state.ids.includes(action.payload.idMessage);
      if (isUnique) {
        state.entities = [action.payload, ...state.entities];
        state.ids = [...state.ids, action.payload.idMessage];
      }
    },
    removeMessages: (state) => {
      state.entities = [];
      state.ids = [];
    },
  },
});

export default messagesSlice.reducer;
export const { addMessage, addMessages, removeMessages } = messagesSlice.actions;
