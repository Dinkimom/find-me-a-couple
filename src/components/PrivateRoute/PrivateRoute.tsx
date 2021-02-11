import { Spin } from 'antd';
import { RootState } from 'app/store';
import { check } from 'features/account/accountSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { PageWrapper } from '../PageWrapper/PageWrapper';
import styles from './PrivateRoute.module.css';

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { isLogged, isChecked } = useSelector(
    (state: RootState) => state.account
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isChecked) {
      dispatch(check());
    }
  }, [dispatch, isChecked]);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isChecked) {
          if (isLogged) {
            return <PageWrapper>{children}</PageWrapper>;
          }

          return (
            <Redirect
              to={{
                pathname: '/account/form',
                state: { from: location },
              }}
            />
          );
        }

        return <Spin size="large" className={styles.spin} />;
      }}
    />
  );
};
