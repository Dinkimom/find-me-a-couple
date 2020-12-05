import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-native';
import { RootState } from '../app/store';
import { check } from '../features/account/accountSlice';
import { PageWrapper } from './PageWrapper';

interface Props {
  title: String;
}

export const PrivateRoute: React.FC<RouteProps & Props> = ({
  children,
  title,
  ...rest
}) => {
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
            return <PageWrapper title={title}>{children}</PageWrapper>;
          }

          return <Redirect to="/login" />;
        }

        return (
          <>
            {/* <Spin
              size="large"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            /> */}
          </>
        );
      }}
    />
  );
};
