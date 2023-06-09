import React from 'react';
import s from './ChatBox.module.scss';
import { useAppSelector, useAuth } from '../../hooks';
import SendMessageForm from '../SendMessageForm';
import MessagesBox from '../MessagesBox';

const ChatBox = () => {
  const currentChatId = useAppSelector((state) => state.chats.currentChatId);
  const currentChat = useAppSelector((state) => state.chats.entities)
    .find((el) => el.id === currentChatId);
  const headerString = currentChat?.name ? currentChat.name : currentChatId;

  const { logOut } = useAuth();

  return (
    <div className={s.page}>
      <div className={s.header}>
        {headerString && <span>{headerString}</span>}
        {!headerString && <span>Выберите чат из списка</span>}
        <button onClick={logOut} type="button" className={s.headerButton}>
          Выйти
        </button>
      </div>
      <MessagesBox />
      <SendMessageForm />
    </div>
  );
};

export default ChatBox;
