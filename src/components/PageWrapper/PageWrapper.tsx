import {
  CalendarOutlined,
  CaretDownOutlined,
  LogoutOutlined,
  SearchOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, Popover } from 'antd';
import React, { ReactNode, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from 'app/store';
import femaleImage from 'assets/images/female.png';
import maleImage from 'assets/images/male.png';
import { SexTypeEnum } from 'enums/SexTypeEnum';
import { logout } from 'features/account/accountSlice';
import { UpdateForm } from 'features/account/components/UpdateForm/UpdateForm';
import styles from './PageWrapper.module.css';
import { PATHS } from 'utils/route-helpers';

const { Header } = Layout;

interface Props {
  children: ReactNode;
}

export const PageWrapper: React.FC<Props> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.account);

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    if (window.confirm('Do you want to logout?')) {
      dispatch(logout());
    }
  }, [dispatch]);

  const history = useHistory();

  const UserButton = useMemo(() => {
    let imageUrl = user?.image;

    if (!imageUrl) {
      imageUrl = user?.sex === SexTypeEnum.Male ? maleImage : femaleImage;
    }

    return (
      <Button type="link" className={styles.userButton}>
        <CaretDownOutlined />

        {user?.name}

        <Avatar src={imageUrl} className={styles.userIcon} />
      </Button>
    );
  }, [user]);

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
  }, [user, handleLogout]);

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link to="/">FindMeCouple</Link>

          <Popover content={PopoverContent} trigger="focus">
            {UserButton}
          </Popover>
        </div>
      </Header>

      <div className={styles.content}>
        <Menu
          mode="inline"
          className={styles.navigation}
          selectedKeys={[window.location.pathname]}
        >
          <Menu.Item
            key={PATHS.HOME}
            icon={<SearchOutlined className={styles.icon} />}
            onClick={() => history.push(PATHS.HOME)}
          >
            Find a couple
          </Menu.Item>
          <Menu.Item
            key={PATHS.DATES}
            icon={<CalendarOutlined className={styles.icon} />}
            onClick={() => history.push(PATHS.DATES)}
          >
            Dates
          </Menu.Item>
          <Menu.Item
            key={PATHS.CHATS}
            icon={<WechatOutlined className={styles.icon} />}
            onClick={() => history.push(PATHS.CHATS)}
          >
            Chats
          </Menu.Item>
        </Menu>

        <div className={styles.main}>{children}</div>
      </div>
    </Layout>
  );
};
