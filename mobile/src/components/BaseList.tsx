import { List, ListProps, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

export const BaseList: React.FC<ListProps> = (props) => {
  if (props.data.length || props.refreshing) {
    return <List {...props} style={styles.list} />;
  }

  return (
    <Text category="h6" appearance="hint" style={styles.hint}>
      It's empty for now
    </Text>
  );
};

const styles = StyleSheet.create({
  list: {
    maxHeight: '70%',
    overflow: 'hidden',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white',
  },
  hint: {
    marginTop: 32,
    textAlign: 'center',
  },
});
