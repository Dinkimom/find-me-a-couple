import { List } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Container } from '../../components/Container/Container';
import { DateStatusEnum } from '../../enums/DateStatusEnum';
import { DateItem } from './components/DateItem';
import styles from './Dates.module.css';
import { fetch, update } from './datesSlice';

export const Dates: React.FC = () => {
  const { list, isFetching, error } = useSelector(
    (state: RootState) => state.dates
  );

  const { user } = useSelector((state: RootState) => state.account);

  const handleStatusChange = (id: string, status: DateStatusEnum) => {
    dispatch(update(id, { status }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch());
  }, [dispatch]);

  return (
    <Container error={error}>
      <List
        className={styles.dates}
        itemLayout="horizontal"
        dataSource={list}
        loading={isFetching}
        renderItem={(item) => (
          <DateItem
            item={item}
            user={user}
            onStatusChange={handleStatusChange}
            key={item._id}
          />
        )}
      />
    </Container>
  );
};
