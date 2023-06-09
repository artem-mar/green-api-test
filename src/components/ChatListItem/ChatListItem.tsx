import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import s from './ChatListItem.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentChat } from '../../app/chatsSlice';

type Props = {
  id: string;
  name: string | undefined;
};

const ChatItem = ({ id, name }: Props) => {
  const dispatch = useAppDispatch();
  const currentChatId = useAppSelector((state) => state.chats.currentChatId);
  const classes = cn({
    [s.item]: true,
    [s.selected]: currentChatId === id,
  });

  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    currentChatId === id && btnRef.current?.scrollIntoView();
  });

  const handleClick = () => {
    dispatch(setCurrentChat(id));
  };

  return (
    <button ref={btnRef} onClick={handleClick} type="button" className={classes}>
      {name}
      {!name && `+${id.split('@').shift()}`}
    </button>
  );
};

export default ChatItem;
