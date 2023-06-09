import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import cn from 'classnames';
import s from './MessagesBox.module.scss';
import { useAppDispatch, useAppSelector, useAuth } from '../../hooks';
import routes from '../../routes';
import { Message, addMessages, removeMessages } from '../../app/messagesSlice';

const MessagesBox = () => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const currentChatId = useAppSelector((state) => state.chats.currentChatId);
  const { instanceId, apiToken } = useAuth();

  const messages = useAppSelector((state) => state.messages.entities);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data }: { data: Message[] } = await axios.post(
          routes.getChatHistory(instanceId, apiToken),
          { chatId: currentChatId, count: 100 },
        );

        data.length > 0 && dispatch(addMessages(data));
      } catch (e) {
        console.log(e);
      }
    };

    if (currentChatId) {
      fetchMessages();
    }

    return () => {
      dispatch(removeMessages());
    };
  }, [currentChatId]);

  useEffect(() => {
    const lastChild = ref.current?.lastChild as HTMLDivElement;
    if (lastChild) {
      lastChild.scrollIntoView();
    }
  });

  return (
    <div ref={ref} className={s.container}>
      {!!messages.length
        && [...messages].reverse().map(
          (m) => m.textMessage && (
          <div
            key={m.idMessage}
            className={cn({
              [s.left]: m.type.includes('incoming'),
              [s.right]: m.type.includes('outgoing'),
            })}
          >
            <div className={s.messageItem}>
              <div className={s.messageBubble}>{m.textMessage}</div>
            </div>
          </div>
          ),
        )}
    </div>
  );
};

export default MessagesBox;
