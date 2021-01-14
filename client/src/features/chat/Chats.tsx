import { Avatar, List, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../app/store';
import styles from './Chats.module.css';
import { fetchChats } from './chatsSlice';

const { Title } = Typography;

export const Chats: React.FC = () => {
  const { list, isFetching } = useSelector((state: RootState) => state.chats);

  const { user } = useSelector((state: RootState) => state.account);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const handleChatClick = (receiver: string) => {
    history.push(`/chats/${receiver}`);
  };

  return (
    <List
      className={styles.chat}
      itemLayout="horizontal"
      dataSource={list}
      loading={isFetching}
      renderItem={(item) => (
        <List.Item
          className={styles.listItem}
          onClick={() => handleChatClick(item.companion._id)}
        >
          <Avatar
            src={item.companion.image}
            className={styles.listItemAvatar}
          />
          <div className={styles.listItemContent}>
            <Title level={5}>{item.companion.name}</Title>
            <p>
              {item.lastMessage.user_id === user?._id
                ? 'You'
                : item.companion.name}
              : {item.lastMessage.text}
            </p>
            <span className={styles.listItemDate}>
              {new Date(item.lastMessage.date).toLocaleTimeString()}{' '}
              {new Date(item.lastMessage.date).toLocaleDateString()}
            </span>
          </div>
        </List.Item>
      )}
    />
  );
};
