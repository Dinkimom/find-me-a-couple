import { Tabs } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { register } from '../../serviceWorker';
import styles from './AccountForm.module.css';
import { login } from './accountSlice';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';

const { TabPane } = Tabs;

enum AccountFormState {
  Login = 'login',
  Register = 'register',
}

export const AccountForm = () => {
  const [currentForm, setCurrentForm] = useState<AccountFormState>(
    AccountFormState.Login
  );

  const { loginForm, registerForm } = useSelector(
    (state: RootState) => state.account
  );

  const dispatch = useDispatch();

  const handleTabChange = (key: string) => {
    setCurrentForm(key as AccountFormState);
  };

  const handleSubmit = useCallback(
    (data: any) => {
      switch (currentForm) {
        case AccountFormState.Login:
          dispatch(login(data));
          break;
        case AccountFormState.Register:
          dispatch(register(data));
          break;
      }
    },
    [dispatch, currentForm]
  );

  return (
    <Tabs
      defaultActiveKey={currentForm}
      onChange={handleTabChange}
      className={styles.root}
    >
      <TabPane tab="Login" key="login">
        <LoginForm onSubmit={handleSubmit} {...loginForm} />
      </TabPane>
      <TabPane tab="Register" key="register">
        <RegisterForm onSubmit={handleSubmit} {...registerForm} />
      </TabPane>
    </Tabs>
  );
};
