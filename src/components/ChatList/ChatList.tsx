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
  const chats = useAppSelector((state) => state.chats.entities);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data }: { data: Chat[] } = await axios.get(routes.getChats(instanceId, apiToken));
        const fetchedChats: Chat[] = data.map(
          (c) => (c.name ? { id: c.id, name: c.name } : { id: c.id }),
        );
        const chatIds = chats.map((ch) => ch.id);
        const uniqueChats = fetchedChats.filter((c) => !chatIds.includes(c.id));

        dispatch(addChats(uniqueChats));
      } catch (e) {
        console.log(e);
      }
    };

    getChats();
  }, [dispatch, apiToken, instanceId]);

  return (
    <>
      <AddChatForm />
      <div className={s.chatList}>
        {chats.map((item) => (
          <ChatListItem key={item.id} id={item.id} name={item.name} />
        ))}
      </div>
    </>
  );
};

export default ChatList;
