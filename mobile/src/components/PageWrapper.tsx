import { Icon, Text } from '@ui-kitten/components';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Link, useRouteMatch } from 'react-router-native';

interface Props {
  children: ReactNode;
  title: String;
}

export const PageWrapper: React.FC<Props> = ({ children, title }) => {
  return (
    <View style={styles.root}>
      <View style={styles.header}></View>
      <Text category="h5" style={styles.title}>
        {title}
      </Text>
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
  title: {
    textAlign: 'center',
    marginBottom: 16,
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
