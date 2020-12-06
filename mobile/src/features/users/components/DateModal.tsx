import { Button, Card, Icon, Modal, Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { DatePicker } from '../../../components/DatePicker';
import { Form } from '../../../components/Form';
import { FormField } from '../../../components/FormField';
import { NewDateDto } from '../../../dtos/NewDateDto';
import { SexTypeEnum } from '../../../enums/SexTypeEnum';
import { useField } from '../../../hooks/useField';
import { create, toggleCreateForm } from '../../dates/datesSlice';

export const DateModal = () => {
  const { opened, isFetching, error } = useSelector(
    (state: RootState) => state.dates.createForm
  );
  const { receiver } = useSelector(
    (state: RootState) => state.dates.createForm
  );
  const { user } = useSelector((state: RootState) => state.account);

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleCreateForm(null));
  };

  const onSubmit = (data: NewDateDto) => {
    if (user && receiver) {
      dispatch(create({ ...data, inviter: user._id, receiver: receiver._id }));
    }
  };

  if (opened) {
    return (
      <Modal
        visible={opened}
        backdropStyle={styles.backdrop}
        onBackdropPress={handleToggle}
      >
        <Card disabled style={styles.card}>
          <Text category="h5" style={styles.title} appearance="hint">
            Invite {receiver.name}
          </Text>

          <View style={styles.iconRoot}>
            <Icon name="person" style={styles.icon} fill="#8F9BB3" />
          </View>

          <Text style={styles.description} category="h6">
            {SexTypeEnum[receiver.sex]}, {receiver.age} years
          </Text>

          <Form
            errors={error}
            onSubmit={onSubmit}
            loading={isFetching}
            rules={{
              date: { required: true },
            }}
          >
            <FormField
              name="date"
              type="date"
              label="Choose date"
              min={new Date()}
            />
          </Form>
        </Card>
      </Modal>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  card: {
    width: 300,
  },
  iconRoot: {
    justifyContent: 'center',
    height: 128,
  },
  icon: {
    width: 128,
    height: 128,
    marginLeft: 64,
  },
  description: {
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
