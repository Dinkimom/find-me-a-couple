import { Button, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SexTypeEnum } from '../enums/SexTypeEnum';

export interface SexSelectProps {
  onChange: (index: SexTypeEnum) => void;
  defaultValue?: SexTypeEnum;
}

export const SexSelect: React.FC<SexSelectProps> = ({
  onChange,
  defaultValue,
}) => {
  const [current, setCurrent] = useState(Number(defaultValue));

  useEffect(() => {
    onChange(current);
  }, [current]);

  return (
    <>
      <Text appearance="hint" category="label" style={styles.label}>
        Sex
      </Text>

      <View style={styles.root}>
        <Button
          onPress={() => setCurrent(SexTypeEnum.Male)}
          style={styles.button}
          status={current === SexTypeEnum.Male ? 'primary' : 'basic'}
        >
          Male
        </Button>
        <Button
          onPress={() => setCurrent(SexTypeEnum.Female)}
          style={styles.button}
          status={current === SexTypeEnum.Female ? 'primary' : 'basic'}
        >
          Female
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
  },
  root: {
    flexDirection: 'row',
  },
  button: {
    width: 100,
    marginRight: 4,
  },
});
