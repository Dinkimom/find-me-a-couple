import { Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-native';
import { RootState } from '../../../app/store';
import { Form } from '../../../components/Form';
import { FormField } from '../../../components/FormField';
import { emailRegex } from '../../../constants/emailRegex';
import { useField } from '../../../hooks/useField';
import { check, login } from '../accountSlice';

export const LoginForm: React.FC = () => {
  const { isFetching, error } = useSelector(
    (state: RootState) => state.account.loginForm
  );
  const { isLogged, isChecked } = useSelector(
    (state: RootState) => state.account
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isChecked) {
      dispatch(check());
    }
  }, [dispatch, isChecked]);

  const onSubmit = (data: any) => {
    dispatch(login(data));
  };

  if (isLogged) {
    return <Redirect to="/users" />;
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title} category="h6">
        Please, login
      </Text>

      <Form
        errors={error}
        onSubmit={onSubmit}
        loading={isFetching}
        rules={{
          email: {
            required: true,
            pattern: emailRegex,
            message: 'Email is a required field',
          },
          password: { required: true, message: 'Password is a required field' },
        }}
      >
        <FormField type="text" name="email" label="Email" />

        <FormField
          type="text"
          name="password"
          label="Password"
          secureTextEntry={true}
        />
      </Form>

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
