import { Avatar, List, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import styles from './Chats.module.css';
import { fetchChats } from './chatsSlice';

const { Title } = Typography;

export const Chats: React.FC = () => {
  const { list, isFetching } = useSelector((state: RootState) => state.chats);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <List
      className={styles.chat}
      itemLayout="horizontal"
      dataSource={list}
      loading={isFetching}
      renderItem={(item) => (
        <List.Item className={styles.listItem}>
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            className={styles.listItemAvatar}
          />
          <div className={styles.listItemContent}>
            <Title level={5}>Some user</Title>
            <span>123</span>
          </div>
        </List.Item>
      )}
    />
  );
};
