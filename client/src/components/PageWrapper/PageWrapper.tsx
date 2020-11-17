import { UserOutlined } from '@ant-design/icons';
import { Button, Layout, Popover } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import React, { ReactNode, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';
import { logout } from '../../features/account/accountSlice';
import { Container } from '../Container/Container';
import styles from './PageWrapper.module.css';

const { Header, Content } = Layout;

interface Props {
  children: ReactNode;
}

export const PageWrapper: React.FC<Props> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.account);

  const dispatch = useDispatch();

  const handleLogout = () => {
    if (window.confirm('Do you want to logout?')) {
      dispatch(logout());
    }
  };

  const PopoverContent = useMemo(() => {
    if (!user) {
      return null;
    }

    return (
      <div>
        <h3>
          {user.name}: {user.email}
        </h3>

        <p>{user.phone}</p>
        <Button block onClick={handleLogout}>
          Logout
        </Button>
      </div>
    );
  }, [user]);

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Container className={styles.headerContainer}>
          <Link to="/">Home</Link>

          <Popover content={PopoverContent} trigger="click">
            <UserOutlined className={styles.userIcon} />
          </Popover>
        </Container>
      </Header>
      <Content className={styles.content}>
        <Container>{children}</Container>
      </Content>
      <Footer className={styles.footer}>
        <Container>Web Maker ©2020 Created by Nikita Dmitriev</Container>
      </Footer>
    </Layout>
  );
};
