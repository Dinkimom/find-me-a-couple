import { Button, Card, Form, InputNumber, List, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'app/store';
import { Container } from 'components/Container/Container';
import { UserCard } from 'components/UserCard/UserCard';
import { UserDto } from 'dtos/UserDto';
import { Filter } from 'types/Filter';
import { toggleCreateForm } from '../dates/datesSlice';
import styles from './Users.module.css';
import { fetch } from './usersSlice';

const { Option } = Select;

export const Users: React.FC = () => {
  const { list, isFetching, error } = useSelector(
    (state: RootState) => state
  ).users;

  const [filter, setFilter] = useState<Filter>();

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(fetch(filter));
  }, [dispatch, filter]);

  const handleSearch = (filter: Filter) => {
    setFilter(filter);
  };

  const handleInvite = (receiver: UserDto) => {
    dispatch(toggleCreateForm(receiver));
  };

  const handleOpenChat = ({ _id }: UserDto) => {
    history.push(`/chats/${_id}`);
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Container error={error}>
      <Form
        layout="inline"
        className={styles.controls}
        onFinish={handleSearch}
        form={form}
      >
        <Form.Item name="age">
          <InputNumber
            min={18}
            className={styles.filterField}
            placeholder="Age from"
          />
        </Form.Item>

        <Form.Item name="sex">
          <Select style={{ width: 100 }} placeholder="Sex">
            <Option value={0}>Male</Option>
            <Option value={1}>Female</Option>
          </Select>
        </Form.Item>

        <Button
          htmlType="button"
          onClick={handleReset}
          className={styles.filterField}
        >
          Reset
        </Button>

        <Button type="primary" htmlType="submit" className={styles.filterField}>
          Search
        </Button>
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

              <div className={styles.cardControls}>
                <Button
                  type="primary"
                  block
                  onClick={() => handleInvite(item)}
                  disabled={item.isInvited}
                >
                  {item.isInvited ? 'Invited' : 'Invite'}
                </Button>
                <Button onClick={() => handleOpenChat(item)}>Message</Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </Container>
  );
};
