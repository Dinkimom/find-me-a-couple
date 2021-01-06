import { Button, Card, Form, InputNumber, List, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { UserCard } from '../../components/UserCard/UserCard';
import { UserDto } from '../../dtos/UserDto';
import { Filter } from '../../types/Filter';
import { toggleCreateForm } from '../dates/datesSlice';
import styles from './Users.module.css';
import { fetch } from './usersSlice';

export const Users: React.FC = () => {
  const { list, isFetching } = useSelector((state: RootState) => state).users;

  const [filter, setFilter] = useState<Filter>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch(filter));
  }, [dispatch, filter]);

  const handleSearch = (filter: Filter) => {
    setFilter(filter);
  };

  const handleInvite = (receiver: UserDto) => {
    dispatch(toggleCreateForm(receiver));
  };

  return (
    <>
      <Form layout="inline" className={styles.controls} onFinish={handleSearch}>
        <Form.Item label="Age from" name="age">
          <InputNumber min={18} style={{ width: 100 }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={list}
        loading={isFetching}
        renderItem={(item) => (
          <List.Item>
            <Card>
              <UserCard user={item} />
              <Button
                type="primary"
                block
                onClick={() => handleInvite(item)}
                disabled={item.isInvited}
              >
                {item.isInvited ? 'Invited' : 'Invite'}
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};
