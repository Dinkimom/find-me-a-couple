import { Icon } from '@ui-kitten/components';
import React, { ReactNode, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-native';
import { RootState } from '../app/store';

interface Props {
  children: ReactNode;
}

export const PageWrapper: React.FC<Props> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.account);

  const dispatch = useDispatch();

  // const handleLogout = () => {
  //   if (window.confirm('Do you want to logout?')) {
  //     dispatch(logout());
  //   }
  // };

  const PopoverContent = useMemo(() => {
    if (!user) {
      return null;
    }

    return (
      <>
        {/* <div>
        <h3>
          {user.name}: {user.email}
        </h3>

        <p>{user.phone}</p>
        <UpdateForm />
        <Button block onClick={handleLogout}>
          Logout
        </Button>
      </div> */}
      </>
    );
  }, [user]);

  return (
    <View style={styles.root}>
      <View style={styles.header}></View>
      {children}

      <View style={styles.bottomBar}>
        {[
          { icon: 'heart-outline', path: '/dates' },
          { icon: 'people-outline', path: '/users' },
          { icon: 'person-outline', path: '/profile' },
        ].map((item) => (
          <Link to={item.path}>
            <Icon
              style={styles.barIcon}
              fill={
                useRouteMatch({ path: item.path, strict: true })
                  ? 'rgb(51, 102, 255)'
                  : '#8F9BB3'
              }
              name={item.icon}
            />
          </Link>
        ))}
      </View>
      {/* <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Container className={styles.headerContainer}>
          <Link to="/">Home</Link>

          <div>
            <Link to="/dates">My dates</Link>

            <Popover content={PopoverContent} trigger="focus">
              <Button
                type="primary"
                shape="circle"
                className={styles.userButton}
              >
                <UserOutlined />
              </Button>
            </Popover>
          </div>
        </Container>
      </Header>
      <Content className={styles.content}>
        <Container>{children}</Container>
      </Content>
      <Footer className={styles.footer}>
        <Container>Web Maker ©2020 Created by Nikita Dmitriev</Container>
      </Footer>
    </Layout> */}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: '100%',
    margin: 16,
  },
  header: {
    height: 80,
  },
  bottomBar: {
    position: 'absolute',
    justifyContent: 'space-around',
    flexDirection: 'row',
    bottom: 80,
    width: '100%',
  },
  barIcon: {
    width: 40,
    height: 40,
  },
  activeLink: {
    color: '#fff',
  },
});
