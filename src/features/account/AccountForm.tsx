import { Tabs } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from 'app/store';
import styles from './AccountForm.module.css';
import { login, register } from './accountSlice';
import { LoginForm } from './components/LoginForm/LoginForm';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import { RegisterDto } from 'dtos/RegisterDto';
import { LoginDto } from 'dtos/LoginDto';

const { TabPane } = Tabs;

enum AccountFormState {
    Login = 'login',
    Register = 'register',
}

export const AccountForm: React.FC = () => {
    const [currentForm, setCurrentForm] = useState<AccountFormState>(AccountFormState.Login);

    const { loginForm, registerForm, isLogged } = useSelector((state: RootState) => state.account);

    const dispatch = useDispatch();

    const handleTabChange = (key: string) => {
        setCurrentForm(key as AccountFormState);
    };

    const handleSubmit = useCallback(
        (data: LoginDto | RegisterDto) => {
            switch (currentForm) {
                case AccountFormState.Login:
                    dispatch(login(data));
                    break;
                case AccountFormState.Register:
                    dispatch(register(data as RegisterDto));
                    break;
            }
        },
        [dispatch, currentForm],
    );

    if (isLogged) {
        return <Redirect to="/" />;
    }

    return (
        <Tabs defaultActiveKey={currentForm} onChange={handleTabChange} className={styles.root}>
            <TabPane tab="Login" key="login">
                <LoginForm onSubmit={handleSubmit} {...loginForm} />
            </TabPane>
            <TabPane tab="Register" key="register">
                <RegisterForm onSubmit={handleSubmit} {...registerForm} />
            </TabPane>
        </Tabs>
    );
};

AccountForm.displayName = 'AccountForm';
