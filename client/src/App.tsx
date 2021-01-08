import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { PrivateRoute } from './components/PrivateRoute';
import { AccountForm } from './features/account/AccountForm';
import { Chats } from './features/chats/Chats';
import { CreateDateForm } from './features/dates/components/CreateDateForm';
import { Dates } from './features/dates/Dates';
import { Users } from './features/users/Users';
import { AccountControl } from './services/AccountControl';
import { DatesControl } from './services/DatesControl';
import { ImageControl } from './services/ImageControl';
import { UsersControl } from './services/UsersControl';

export const accountControl = new AccountControl();
export const usersControl = new UsersControl();
export const datesControl = new DatesControl();
export const imageControl = new ImageControl();

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/account/form" component={AccountForm} />
          <PrivateRoute exact path="/">
            <Users />
          </PrivateRoute>
          <PrivateRoute exact path="/dates">
            <Dates />
          </PrivateRoute>
          <PrivateRoute exact path="/chats">
            <Chats />
          </PrivateRoute>
        </Switch>
      </Router>
      <CreateDateForm />
    </div>
  );
};

export default App;
