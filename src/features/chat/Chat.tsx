import { Comment, List } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { socket } from '../../App';
import { RootState } from '../../app/store';
import { Editor } from '../../components/Editor/Editor';
import { ChatDto } from '../../dtos/ChatDto';
import { MessageDto } from '../../dtos/MessageDto';
import { useUserAvatar } from '../../hooks/useUserAvatar';
import styles from './Chat.module.css';
import { fetchChat } from './chatsSlice';

export const Chat: React.FC = () => {
  const { receiver } = useParams<{ receiver: string }>();

  const { chat } = useSelector((state: RootState) => state.chats);

  const { user } = useSelector((state: RootState) => state.account);

  const history = useHistory();

  const dispatch = useDispatch();

  const endMessageRef = useRef<any>();

  const scrollToBottom = () => {
    if (endMessageRef.current) {
      endMessageRef.current.scrollIntoView();
    }
  };

  useEffect(scrollToBottom, [chat]);

  useEffect(() => {
    dispatch(fetchChat(receiver));
  }, [dispatch, receiver]);

  const handleMessageSend = useCallback(
    (message: MessageDto) => {
      socket.send(
        JSON.stringify({
          user_id: user?._id,
          type: 'POST',
          payload: {
            receiver,
            message,
          },
        })
      );
    },
    [receiver, socket]
  );

  useEffect(() => {
    socket.onmessage = (message) => {
      const data: { status: 404 | 200 | 201; result: ChatDto } = JSON.parse(
        message.data as string
      );

      switch (data.status) {
        case 201:
          dispatch(fetchChat(receiver, true));
          break;
        case 404:
          history.push('/not-found');
          break;
      }
    };

    socket.onclose = () => {
      socket.send(JSON.stringify({ user_id: user?._id }));
    };

    socket.send(
      JSON.stringify({
        type: 'INIT',
        user_id: user?._id,
      })
    );
  }, []);

  const { companion } = chat.chatData || {};

  const companionImage = useUserAvatar(companion);

  return (
    <div className={styles.root}>
      {companion && (
        <div className={styles.companionBlock}>
          <Avatar src={companionImage} size="large" />
          <h3>{companion?.name}</h3>
        </div>
      )}

      <List
        className={styles.messages}
        loading={chat.isFetching}
        dataSource={chat.chatData?.messages || []}
        itemLayout="horizontal"
        renderItem={(item: MessageDto, index) => {
          const isOutput = item.user_id !== receiver;
          const isLast =
            index === (chat.chatData as ChatDto).messages?.length - 1;

          return (
            <Comment
              className={`${styles.message} ${
                isOutput ? styles.messageOutput : null
              }`}
              author={isOutput ? user?.name : companion?.name}
              content={<p className={styles.messageText}>{item.text}</p>}
              datetime={
                <p
                  className={styles.messageTime}
                  ref={isLast ? endMessageRef : undefined}
                >
                  {new Date(item.date).toLocaleTimeString()}{' '}
                  {new Date(item.date).toDateString()}
                </p>
              }
            />
          );
        }}
      />

      {companion && <Editor onSubmit={handleMessageSend} submitting={false} />}
    </div>
  );
};
