import { Icon } from '@ui-kitten/components';
import React, { ReactNode, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-native';
import { RootState } from '../app/store';

interface Props {
  children: ReactNode;
}

export const PageWrapper: React.FC<Props> = ({ children }) => {
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
