import { cleanup } from '@testing-library/react';
import { Card, List } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetch } from './datesSlice';

export const Dates: React.FC = () => {
  const { list, isFetching } = useSelector((state: RootState) => state.dates);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch());
  }, []);

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={list}
      loading={isFetching}
      renderItem={(item) => (
        <List.Item>
          <Card>123</Card>
        </List.Item>
      )}
    />
  );
};
