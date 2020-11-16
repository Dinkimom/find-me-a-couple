import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { PrivateRoute } from './components/PrivateRoute';
import { AccountForm } from './features/account/AccountForm';
import { AccountInfo } from './features/account/AccountInfo';
import { Users } from './features/account/users/Users';
import { AccountControl } from './services/AccountControl';
import { UsersControl } from './services/UsersControl';

export const accountControl = new AccountControl();
export const usersControl = new UsersControl();

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/account/info" component={AccountInfo} />
          <Route path="/account/form" component={AccountForm} />
          <PrivateRoute exact path="/">
            <Users />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
