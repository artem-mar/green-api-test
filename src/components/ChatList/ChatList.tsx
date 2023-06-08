import React, { useEffect } from 'react';
import axios from 'axios';
import routes from '../../routes';
import { useAppDispatch, useAppSelector, useAuth } from '../../hooks';
import { Chat, addChats, chatsAdapter } from '../../app/chatsSlice';
import { RootState } from '../../app/store';
import s from './ChatList.module.scss';
import AddChatForm from '../AddChatForm';
import ChatListItem from '../ChatListItem';

const ChatList = () => {
  const { apiToken, instanceId } = useAuth();
  const dispatch = useAppDispatch();
  const chatSelectors = chatsAdapter.getSelectors<RootState>((state) => state.chats);
  const chatItems = useAppSelector(chatSelectors.selectAll) as Chat[];

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data }: { data: Chat[] } = await axios.get(routes.getChats(instanceId, apiToken));
        const chats: Chat[] = data.map((c) => (c.name ? { id: c.id, name: c.name } : { id: c.id }));

        dispatch(addChats(chats));
      } catch (e) {
        console.log(e);
      }
    };

    getChats();
  }, [dispatch, apiToken, instanceId]);

  return (
    <div className={s.panel}>
      <AddChatForm />
      <div className={s.chatList}>
        {chatItems.map((item) => (
          <ChatListItem key={item.id} id={item.id} name={item.name} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
