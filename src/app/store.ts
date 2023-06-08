import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import chatsReducer from './chatsSlice';

export const store = configureStore({
  reducer: {
    chats: chatsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
export {};
