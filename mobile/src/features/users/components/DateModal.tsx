import {
  Button,
  Card,
  Datepicker,
  Icon,
  Modal,
  Text,
} from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { NewDateDto } from '../../../dtos/NewDateDto';
import { SexTypeEnum } from '../../../enums/SexTypeEnum';
import { useField } from '../../../hooks/useField';
import { create, toggleCreateForm } from '../../dates/datesSlice';

export const DateModal = () => {
  const { opened, ...formState } = useSelector(
    (state: RootState) => state.dates.createForm
  );
  const { receiver } = useSelector(
    (state: RootState) => state.dates.createForm
  );
  const { user } = useSelector((state: RootState) => state.account);

  const {
    handleSubmit,
    errors,
    getValues,
    setValue,
    register,
    watch,
  } = useForm();

  useEffect(() => {
    register('date', { required: true });
  }, []);

  watch('date');

  const { handler, status } = useField(setValue, errors);

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
        <Card disabled={true} style={styles.card}>
          <Text category="h5" style={styles.title} appearance="hint">
            Invite {receiver.name}
          </Text>

          <View style={styles.iconRoot}>
            <Icon name="person" style={styles.icon} fill="#8F9BB3" />
          </View>

          <Text style={styles.description} category="h6">
            {SexTypeEnum[Number(receiver.sex)]}, {receiver.age} years
          </Text>
          {/* {console.log(getValues())} */}

          <Datepicker
            label="Choose date"
            min={new Date()}
            date={getValues().date}
            onSelect={(date) => setValue('date', date)}
            status={status('date')}
            style={styles.input}
          />

          <Button onPress={handleSubmit(onSubmit)}>INVITE</Button>
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
  input: {
    marginBottom: 16,
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
