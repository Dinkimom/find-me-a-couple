import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { NativeRouter, Redirect, Route, Switch } from 'react-router-native';
import { store } from './src/app/store';
import { PrivateRoute } from './src/components/PrivateRoute';
import { LoginForm } from './src/features/account/components/LoginForm';
import { RegisterForm } from './src/features/account/components/RegisterForm';
import { Dates } from './src/features/dates/Dates';
import { Users } from './src/features/users/Users';

const App: React.FC = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={store}>
          <NativeRouter>
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Redirect to="/users" />}
              />
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/register" component={RegisterForm} />
              <PrivateRoute exact path="/users">
                <Users />
              </PrivateRoute>
              <PrivateRoute exact path="/profile">
                <Users />
              </PrivateRoute>
              <PrivateRoute exact path="/dates">
                <Dates />
              </PrivateRoute>
            </Switch>

            {/* <Route path="/account/form" component={AccountForm} />
        <PrivateRoute exact path="/">
          <Users />
        </PrivateRoute>
        <PrivateRoute exact path="/dates">
          <Dates />
        </PrivateRoute>

        <CreateDateForm /> */}
          </NativeRouter>
        </Provider>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  layout: {
    margin: 16,
    marginTop: 108,
  },
});

export default App;
