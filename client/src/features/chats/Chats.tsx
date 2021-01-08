import { Avatar, List, Typography } from 'antd';
import React from 'react';
import styles from './Chats.module.css';

const { Title } = Typography;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

export const Chats: React.FC = () => {
  return (
    <List
      className={styles.chat}
      itemLayout="horizontal"
      dataSource={data}
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
