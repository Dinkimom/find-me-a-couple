import { Icon, Input, Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-native';
import { RootState } from '../../../app/store';
import { Button } from '../../../components/Button';
import { emailRegex } from '../../../constants/emailRegex';
import { useField } from '../../../hooks/useField';
import { login } from '../accountSlice';

export const LoginForm: React.FC = () => {
  const { register, handleSubmit, setValue, errors } = useForm();
  const { handler } = useField(setValue);

  const { isFetching } = useSelector(
    (state: RootState) => state.account.loginForm
  );

  useEffect(() => {
    register('email', { required: true, pattern: emailRegex });
    register('password', { required: true });
  }, []);

  const onSubmit = (data: any) => {
    login(data);
  };

  // move error display into hook

  return (
    <View style={styles.root}>
      <Text style={styles.title} category="h6">
        Please, login
      </Text>

      <Input
        label="Email"
        style={styles.input}
        onChangeText={handler('email')}
        status={errors.email ? 'danger' : 'undefined'}
      />

      <Input
        label="Password"
        style={styles.input}
        onChangeText={handler('password')}
        secureTextEntry={true}
        status={errors.password ? 'danger' : 'undefined'}
      />

      <Button
        style={styles.formButton}
        onPress={handleSubmit(onSubmit)}
        loading={isFetching}
      >
        LOGIN
      </Button>

      <View style={styles.caption}>
        <Text appearance="hint" style={styles.hint}>
          Don't have account?
        </Text>
        <Link to="/register" style={styles.link}>
          <Text status="primary" style={styles.hint}>
            Register
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
