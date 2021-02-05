import { List } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { socket } from '../../App';
import { RootState } from '../../app/store';
import { Container } from '../../components/Container/Container';
import { ChatDto } from '../../dtos/ChatDto';
import styles from './Chats.module.css';
import { fetchChats, fetchChatsFailure } from './chatsSlice';
import { ChatsItem } from './components/ChatsItem';

export const Chats: React.FC = () => {
  const { list, isFetching, error } = useSelector(
    (state: RootState) => state.chats
  );

  const { user } = useSelector((state: RootState) => state.account);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const handleChatClick = (receiver: string) => {
    history.push(`/chats/${receiver}`);
  };

  useEffect(() => {
    socket.onmessage = (message) => {
      const data: { status: 404 | 200 | 201; result: ChatDto } = JSON.parse(
        message.data as string
      );

      switch (data.status) {
        case 201:
          dispatch(fetchChats(true));
          break;
        case 404:
          history.push('/not-found');
          break;
      }
    };

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: 'INIT',
          user_id: user?._id,
        })
      );
    };

    socket.onerror = () => {
      dispatch(fetchChatsFailure({ errorMessage: 'Could not fetch chats' }));
    };
  }, [user, history, dispatch]);

  return (
    <Container error={error}>
      <List
        className={styles.chat}
        itemLayout="horizontal"
        dataSource={list}
        loading={isFetching}
        renderItem={(item) => <ChatsItem {...item} onClick={handleChatClick} />}
      />
    </Container>
  );
};
