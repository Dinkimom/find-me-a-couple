import { Layout } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './PageWrapper.module.css';

const { Header, Content } = Layout;

interface Props {
  children: ReactNode;
}

export const PageWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Link to="/">Home</Link>
      </Header>
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};
