import React from 'react';
import { Provider } from 'react-redux';
import { NativeRouter, Route } from 'react-router-native';
import { store } from './src/app/store';
import { PrivateRoute } from './src/components/PrivateRoute';
import { AccountForm } from './src/features/account/AccountForm';
import { CreateDateForm } from './src/features/dates/components/CreateDateForm';
import { Dates } from './src/features/dates/Dates';
import { Users } from './src/features/users/Users';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NativeRouter>
        <Route path="/account/form" component={AccountForm} />
        <PrivateRoute exact path="/">
          <Users />
        </PrivateRoute>
        <PrivateRoute exact path="/dates">
          <Dates />
        </PrivateRoute>

        <CreateDateForm />
      </NativeRouter>
    </Provider>
  );
};

export default App;
