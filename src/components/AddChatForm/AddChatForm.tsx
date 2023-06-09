import React from 'react';
import InputMask from 'react-input-mask';
import { SubmitHandler, useForm } from 'react-hook-form';
import s from './AddChatForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addChat, setCurrentChat } from '../../app/chatsSlice';

type Input = { phone: string };

const AddChatForm = () => {
  const dispatch = useAppDispatch();

  const { reset, handleSubmit, register } = useForm<Input>();

  const { ids, currentChatId } = useAppSelector((state) => state.chats);

  const onSubmit: SubmitHandler<Input> = async ({ phone }) => {
    const phoneNumber = phone.replace(/[^0-9]/g, '');

    if (phoneNumber.length === 11) {
      const chatId = `${phoneNumber}@c.us`;
      if (!ids.includes(chatId)) {
        dispatch(addChat({ id: chatId }));
      }
      if (currentChatId !== chatId) {
        dispatch(setCurrentChat(chatId));
      }
      reset({ phone: '' });
    }
  };

  return (
    <div className={s.container}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={s.form}
        action="submit"
      >
        <InputMask
          mask="+7 (999) 999 99-99"
          className={s.input}
          placeholder="Добавить чат"
          {...register('phone')}
        />
        <button className={s.btn} type="submit">
          +
        </button>
      </form>
    </div>
  );
};

export default AddChatForm;
