import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { NativeRouter, Route } from 'react-router-native';
import { store } from './src/app/store';
import { LoginForm } from './src/features/account/components/LoginForm';
import { RegisterForm } from './src/features/account/components/RegisterForm';

const App: React.FC = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <NativeRouter>
          <Layout style={styles.layout}>
            <Route path="/" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            {/* <Route path="/account/form" component={AccountForm} />
        <PrivateRoute exact path="/">
          <Users />
        </PrivateRoute>
        <PrivateRoute exact path="/dates">
          <Dates />
        </PrivateRoute>

        <CreateDateForm /> */}
          </Layout>
        </NativeRouter>
      </Provider>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  layout: {
    margin: 16,
    marginTop: 108,
  },
});

export default App;
