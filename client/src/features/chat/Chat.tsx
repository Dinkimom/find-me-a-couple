import userEvent from '@testing-library/user-event';
import { Comment, List } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../app/store';
import { Editor } from '../../components/Editor/Editor';
import { MessageDto } from '../../dtos/MessageDto';
import styles from './Chat.module.css';
import { fetchChat, sendMessage } from './chatsSlice';

export const Chat: React.FC = () => {
  const { receiver } = useParams<{ receiver: string }>();

  const { chat } = useSelector((state: RootState) => state.chats);

  const { user } = useSelector((state: RootState) => state.account);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChat(receiver));
  }, [dispatch, receiver]);

  const handleMessageSend = useCallback(
    (data: MessageDto) => {
      dispatch(sendMessage(receiver, data));
    },
    [receiver, dispatch]
  );

  return (
    <div className={styles.root}>
      <List
        className={styles.messages}
        loading={chat.isFetching}
        dataSource={chat.chatData?.messages || []}
        itemLayout="horizontal"
        renderItem={(item: MessageDto) => {
          const isOutput = item.user_id !== receiver;

          return (
            <Comment
              className={`${styles.message} ${
                isOutput ? styles.messageOutput : null
              }`}
              avatar={isOutput ? null : chat.chatData?.companion.image}
              author={isOutput ? user?.name : chat.chatData?.companion.name}
              content={<p className={styles.messageText}>{item.text}</p>}
              datetime={
                <p className={styles.messageTime}>
                  {new Date(item.date).toLocaleTimeString()}{' '}
                  {new Date(item.date).toDateString()}
                </p>
              }
            />
          );
        }}
      />

      <Editor onSubmit={handleMessageSend} submitting={false} />
    </div>
  );
};
