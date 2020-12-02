import { Button as BaseButton, Spinner } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonProps } from 'react-native-elements';

interface Props extends ButtonProps {
  loading: boolean;
}

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="control" />
  </View>
);

export const Button: React.FC<Props> = ({ loading, ...other }) => {
  if (loading) {
    return <BaseButton {...other} accessoryLeft={LoadingIndicator} />;
  }

  return <BaseButton {...other} />;
};

const styles = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
