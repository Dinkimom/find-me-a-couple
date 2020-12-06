import { Text } from '@ui-kitten/components';
import React from 'react';
import { Alert, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { FormField } from '../../components/FormField';
import { emailRegex } from '../../constants/emailRegex';
import { phoneRegex } from '../../constants/phoneRegex';
import { RegisterDto } from '../../dtos/RegisterDto';
import { logout, remove, update } from './accountSlice';

export const Profile: React.FC = () => {
  const { isFetching } = useSelector(
    (state: RootState) => state.account.updateForm
  );
  const { error } = useSelector((state: RootState) => state.account.updateForm);
  const { user } = useSelector((state: RootState) => state.account);

  const dispatch = useDispatch();

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
    Alert.alert(
      'Are you sure you want logout?',
      '',
      [
        {
          text: 'Cancel',

          style: 'cancel',
        },
        { text: 'OK', onPress: () => dispatch(logout()) },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.root}>
      <Form
        errors={error}
        onSubmit={onSubmit}
        loading={isFetching}
        defaultValues={user}
      >
        <FormField name="name" label="Name" type="text" />

        <FormField name="age" label="Age" type="text" />

        <FormField name="sex" label="Sex" type="sexSelect" />

        <FormField
          name="phone"
          label="Phone"
          type="text"
          keyboardType="phone-pad"
        />

        <FormField name="email" label="Email" type="text" />

        <FormField
          name="password"
          label="Password"
          type="text"
          secureTextEntry={true}
        />
      </Form>

      <Button onPress={handleLogout} status="basic" style={styles.formButton}>
        LOGOUT
      </Button>

      <Text style={styles.hint}>
        You can{' '}
        <Text status="primary" onPress={handleRemove}>
          delete your account
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    maxHeight: '70%',
    overflow: 'hidden',
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
