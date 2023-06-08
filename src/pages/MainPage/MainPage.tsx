/* eslint-disable no-await-in-loop */
import React, { useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks';
import ChatList from '../../components/ChatList';
import routes from '../../routes';
import s from './MainPage.module.scss';

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
    textMessageData: {
      textMessage: string;
    };
  };
};

type Notification = {
  receiptId: number;
  body: NotificationBody;
};

const MainPage = () => {
  const { logOut, instanceId, apiToken } = useAuth();

  const gettingNotifications = useRef(true);
  const subscribeToNotifications = useCallback(async () => {
    gettingNotifications.current = true;
    try {
      while (gettingNotifications.current) {
        const response = await axios.get(routes.receiveNotification(instanceId, apiToken));
        const notification: Notification | null = response.data;
        if (notification) {
          // добавить с стейт редакса
          await axios.delete(
            routes.deleteNotification(instanceId, apiToken, notification.receiptId),
          );
        }
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
        <button className="btn" type="button" onClick={logOut}>
          logOut
        </button>
      </div>
    </div>
  );
};

export default MainPage;
