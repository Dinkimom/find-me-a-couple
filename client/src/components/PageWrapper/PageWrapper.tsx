import {
  CalendarOutlined,
  LogoutOutlined,
  SearchOutlined,
  WechatOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, Popover } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import React, { ReactNode, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../../app/store';
import femaleImage from '../../assets/images/female.png';
import maleImage from '../../assets/images/male.png';
import { SexTypeEnum } from '../../enums/SexTypeEnum';
import { logout } from '../../features/account/accountSlice';
import { UpdateForm } from '../../features/account/components/UpdateForm';
import { Container } from '../Container/Container';
import styles from './PageWrapper.module.css';

const { SubMenu } = Menu;

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

  const history = useHistory();

  const PopoverContent = useMemo(() => {
    if (!user) {
      return null;
    }

    return (
      <div>
        <UpdateForm />
        <Button
          block
          onClick={handleLogout}
          type="text"
          icon={<LogoutOutlined />}
        >
          Logout
        </Button>
      </div>
    );
  }, [user]);

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Container className={styles.headerContainer}>
          <Link to="/">FindMeCouple</Link>

          <Popover content={PopoverContent} trigger="focus">
            <Button type="link">
              <Avatar
                src={
                  user?.image ||
                  (user?.sex === SexTypeEnum.Male ? maleImage : femaleImage)
                }
                className={styles.userIcon}
              />

              {user?.name}

              <CaretDownOutlined />
            </Button>
          </Popover>
        </Container>
      </Header>

      <Container className={styles.content}>
        <Menu
          mode="inline"
          className={styles.navigation}
          selectedKeys={[window.location.pathname]}
        >
          <Menu.Item
            key="/"
            icon={<SearchOutlined className={styles.icon} />}
            onClick={() => history.push('/')}
          >
            Find a couple
          </Menu.Item>
          <Menu.Item
            key="/dates"
            icon={<CalendarOutlined className={styles.icon} />}
            onClick={() => history.push('/dates')}
          >
            Dates
          </Menu.Item>
          <Menu.Item
            key="/chats"
            icon={<WechatOutlined className={styles.icon} />}
            onClick={() => history.push('/chats')}
          >
            Chats
          </Menu.Item>
        </Menu>

        <div className={styles.main}>{children}</div>

        <Footer className={styles.footer}>
          <Container>Web Maker ©2020 Created by Nikita Dmitriev</Container>
        </Footer>
      </Container>
    </Layout>
  );
};
