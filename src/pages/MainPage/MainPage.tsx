/* eslint-disable no-await-in-loop */
import React, { useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAppDispatch, useAuth } from '../../hooks';
import ChatList from '../../components/ChatList';
import routes from '../../routes';
import s from './MainPage.module.scss';
import ChatBox from '../../components/ChatBox';
import { Message, addMessage } from '../../app/messagesSlice';

type NotificationBody = {
  typeWebhook: string;
  instanceData: {
    idInstance: number;
    wid: string;
    typeInstance: string;
  };
  timestamp: number;
  idMessage: string;
  senderData: {
    chatId: string;
    chatName: string;
    sender: string;
    senderName: string;
  };
  messageData: {
    typeMessage: string;
    textMessageData?: {
      textMessage: string;
    };
    extendedTextMessageData?: {
      text: string;
    };
  };
};

type Notification = {
  receiptId: number;
  body: NotificationBody;
};

const MainPage = () => {
  const { instanceId, apiToken } = useAuth();
  const dispatch = useAppDispatch();

  const gettingNotifications = useRef(true);
  const subscribeToNotifications = useCallback(async () => {
    gettingNotifications.current = true;
    try {
      while (gettingNotifications.current) {
        const response = await axios.get(routes.receiveNotification(instanceId, apiToken));
        const notification: Notification = response.data;
        // добавляем в стейт только текстовые сообщения
        if (notification && notification.body.messageData.typeMessage.toLowerCase().includes('text')) {
          const { body } = notification;
          const message: Message = {
            type: body.typeWebhook,
            idMessage: body.idMessage,
            chatId: body.senderData.chatId,
            textMessage:
              body.messageData.textMessageData?.textMessage
              || body.messageData.extendedTextMessageData?.text,
            typeMessage: body.messageData.typeMessage,
          };
          dispatch(addMessage(message));
        }
        // удаляем уведомления любого типа
        notification && await axios.delete(
          routes.deleteNotification(instanceId, apiToken, notification.receiptId),
        );
      }
    } catch (ex) {
      console.error(ex);
    }
  }, [apiToken, instanceId]);

  const unsubscribe = () => {
    gettingNotifications.current = false;
  };

  useEffect(() => {
    subscribeToNotifications();

    return () => {
      unsubscribe();
    };
  }, [apiToken, instanceId, subscribeToNotifications]);

  return (
    <div className={s.page}>
      <div className={s.gridLeft}>
        <ChatList />
      </div>
      <div className={s.gridRight}>
        <ChatBox />
      </div>
    </div>
  );
};

export default MainPage;
