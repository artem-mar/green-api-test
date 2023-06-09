import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import s from './SendMessageForm.module.scss';
import { useAppSelector, useAuth } from '../../hooks';
import routes from '../../routes';

type Input = {
  message: string;
};

const SendMessageForm = () => {
  const currentChatId = useAppSelector((state) => state.chats.currentChatId);
  const { apiToken, instanceId } = useAuth();
  const {
    resetField,
    handleSubmit,
    register,
    formState: { isSubmitting },

  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async ({ message }) => {
    const trimed = message.trim();
    if (trimed.length > 0) {
      try {
        await axios.post(routes.sendMessage(instanceId, apiToken), {
          chatId: currentChatId,
          message,
        });

        resetField('message', { keepTouched: false });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form} action="submit">
      <input
        disabled={isSubmitting || !currentChatId}
        autoComplete="off"
        className={s.input}
        placeholder={currentChatId ? 'Введите сообщение...' : 'Выберите чат'}
        {...register('message')}
      />

      <button disabled={isSubmitting || !currentChatId} className={s.btn} type="submit">
        &#129122;
      </button>
    </form>
  );
};

export default SendMessageForm;
