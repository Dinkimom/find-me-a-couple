import { Divider, Input, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Button } from '../../components/Button';
import { SexSelect } from '../../components/SexSelect';
import { emailRegex } from '../../constants/emailRegex';
import { phoneRegex } from '../../constants/phoneRegex';
import { RegisterDto } from '../../dtos/RegisterDto';
import { useField } from '../../hooks/useField';
import { logout, remove, toggleUpdateForm, update } from './accountSlice';

export const Profile: React.FC = () => {
  const { isFetching, opened, ...formState } = useSelector(
    (state: RootState) => state.account.updateForm
  );
  const { user } = useSelector((state: RootState) => state.account);

  const {
    register,
    handleSubmit,
    setValue,
    errors,
    reset,
    getValues,
    watch,
    control,
  } = useForm();
  const { handler, status } = useField(setValue, errors);

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [reset, user]);

  useEffect(() => {
    register('name', { required: true });
    register('age', { required: true, min: 18, pattern: /\d+/ });
    register('sex', { required: true });
    register('phone', { required: true, pattern: phoneRegex });
    register('email', { required: true, pattern: emailRegex });
    register('password', { required: true });
  }, []);

  const [sex, setSex] = useState();

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleUpdateForm());
  };

  const onSubmit = (data: RegisterDto) => {
    dispatch(update(user?._id || '', data));
  };

  const handleRemove = () => {
    Alert.alert(
      'Are you sure you want to delete your profile?',
      '',
      [
        {
          text: 'Cancel',

          style: 'cancel',
        },
        { text: 'OK', onPress: () => dispatch(remove(user?._id || '')) },
      ],
      { cancelable: false }
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Text category="h5" style={styles.title}>
        Profile
      </Text>

      <Input
        label="Name"
        style={styles.input}
        onChangeText={handler('name')}
        status={status('name')}
        defaultValue={user?.name}
      />

      <Input
        label="Age"
        style={styles.input}
        onChangeText={handler('age')}
        status={status('age')}
        defaultValue={String(user?.age)}
      />

      <SexSelect onChange={handler('sex')} defaultValue={user?.sex} />

      <Input
        label="Phone"
        style={styles.input}
        onChangeText={handler('phone')}
        status={status('phone')}
        defaultValue={user?.phone}
        keyboardType="phone-pad"
      />

      <Divider style={styles.divider} />

      <Input
        label="Email"
        style={styles.input}
        onChangeText={handler('email')}
        status={status('email')}
        defaultValue={user?.email}
      />

      <Input
        label="Password"
        style={styles.input}
        onChangeText={handler('password')}
        status={status('password')}
        secureTextEntry={true}
      />

      <Button
        style={styles.formButton}
        onPress={handleSubmit(onSubmit)}
        loading={isFetching}
      >
        UPDATE
      </Button>

      <Button onPress={handleLogout} status="basic" style={styles.formButton}>
        LOGOUT
      </Button>

      <Text style={styles.hint}>
        You can{' '}
        <Text status="primary" onPress={handleRemove}>
          delete your account
        </Text>
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  divider: {
    marginBottom: 16,
  },
  formButton: {
    marginBottom: 16,
  },
  hint: {
    textAlign: 'center',
  },
});
