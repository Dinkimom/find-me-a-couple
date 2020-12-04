import { Divider, Input, Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-native';
import { RootState } from '../../../app/store';
import { Button } from '../../../components/Button';
import { SexSelect } from '../../../components/SexSelect';
import { emailRegex } from '../../../constants/emailRegex';
import { phoneRegex } from '../../../constants/phoneRegex';
import { useField } from '../../../hooks/useField';
import { check, register as submitRegisterForm } from '../accountSlice';

export const RegisterForm: React.FC = () => {
  const { register, handleSubmit, setValue, errors } = useForm();
  const { handler, status } = useField(setValue, errors);

  const { isFetching, error } = useSelector(
    (state: RootState) => state.account.registerForm
  );

  useEffect(() => {
    register('name', { required: true });
    register('age', { required: true, min: 18, pattern: /\d+/ });
    register('sex', { required: true });
    register('phone', { required: true, pattern: phoneRegex });
    register('email', { required: true, pattern: emailRegex });
    register('password', { required: true });
  }, []);

  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    dispatch(submitRegisterForm(data));
  };

  const { isLogged, isChecked } = useSelector(
    (state: RootState) => state.account
  );

  useEffect(() => {
    if (!isChecked) {
      dispatch(check());
    }
  }, [dispatch, isChecked]);

  if (isLogged) {
    return <Redirect to="/users" />;
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title} category="h6">
        Please, follow the form to register
      </Text>

      <Input
        label="Name"
        style={styles.input}
        onChangeText={handler('name')}
        status={status('name')}
      />

      <Input
        label="Age"
        style={styles.input}
        onChangeText={handler('age')}
        status={status('age')}
      />

      <SexSelect onChange={handler('sex')} />

      <Input
        label="Phone"
        style={styles.input}
        onChangeText={handler('phone')}
        status={status('phone')}
        keyboardType="phone-pad"
      />

      <Divider style={styles.divider} />

      <Input
        label="Email"
        style={styles.input}
        onChangeText={handler('email')}
        status={status('email')}
      />

      <Input
        label="Password"
        style={styles.input}
        onChangeText={handler('password')}
        status={status('password')}
        secureTextEntry={true}
      />

      {error && (
        <Text status="danger" style={styles.hint}>
          {error.errorMessage}
        </Text>
      )}

      <Button
        style={styles.formButton}
        onPress={handleSubmit(onSubmit)}
        loading={isFetching}
      >
        Register
      </Button>

      <View style={styles.caption}>
        <Text appearance="hint" style={styles.hint}>
          Have an account?
        </Text>
        <Link to="/login" style={styles.link}>
          <Text status="primary" style={styles.hint}>
            Login
          </Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
  formButton: {
    marginTop: 24,
  },
  caption: {
    marginTop: 16,
  },
  hint: {
    textAlign: 'center',
  },
  link: {
    marginTop: 8,
  },
  divider: {
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  root: {
    justifyContent: 'center',
    height: '100%',
    margin: 16,
  },
});
