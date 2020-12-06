import { Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-native';
import { RootState } from '../../../app/store';
import { Form } from '../../../components/Form';
import { FormField } from '../../../components/FormField';
import { emailRegex } from '../../../constants/emailRegex';
import { phoneRegex } from '../../../constants/phoneRegex';
import { check, register as submitRegisterForm } from '../accountSlice';

export const RegisterForm: React.FC = () => {
  const { isFetching, error } = useSelector(
    (state: RootState) => state.account.registerForm
  );

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

      <Form
        errors={error}
        onSubmit={onSubmit}
        loading={isFetching}
        rules={{
          name: { required: true },
          age: { required: true, min: 18, pattern: /\d+/ },
          sex: { required: true },
          phone: { required: true, pattern: phoneRegex },
          email: { required: true, pattern: emailRegex },
          password: { required: true },
        }}
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
