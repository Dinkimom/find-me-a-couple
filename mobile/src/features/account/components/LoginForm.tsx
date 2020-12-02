import { Input, Text } from '@ui-kitten/components';
import { Button } from '../../../components/Button';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Link } from 'react-router-native';
import { BaseFormProps } from '../../../components/BaseForm';
import { useField } from '../../../hooks/useField';
import { login } from '../accountSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

export const LoginForm: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { handler } = useField(setValue);

  const { isFetching } = useSelector(
    (state: RootState) => state.account.loginForm
  );

  useEffect(() => {
    register('email');
    register('password');
  }, []);

  const onSubmit = (data: any) => {
    login(data);
  };

  return (
    <View>
      <Input
        label="Email"
        style={styles.input}
        onChangeText={handler('email')}
      />
      <Input
        label="Password"
        style={styles.input}
        onChangeText={handler('password')}
      />

      <Button
        style={styles.formButton}
        onPress={handleSubmit(onSubmit)}
        loading={isFetching}
      >
        Submit
      </Button>

      <View style={styles.caption}>
        <Text appearance="hint" style={styles.hint}>
          Don't have account?
        </Text>
        <Link to="/register">
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
  caption: {
    marginTop: 16,
  },
  hint: {
    textAlign: 'center',
  },
  link: {
    marginBottom: 16,
  },
});
