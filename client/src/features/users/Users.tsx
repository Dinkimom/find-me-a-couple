import { List, Card, Input, Button, Form, Select, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Filter } from '../../types/Filter';
import { fetch } from './usersSlice';

import styles from './Users.module.css';
import { SexTypeEnum } from '../../enums/SexTypeEnum';

import maleImage from './assets/male.png';
import femaleImage from './assets/female.png';

const { Option } = Select;

export const Users: React.FC = () => {
  const { list, isFetching } = useSelector((state: RootState) => state).users;

  const [filter, setFilter] = useState<Filter>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch(filter));
  }, [filter]);

  const handleSearch = (filter: Filter) => {
    setFilter(filter);
  };

  return (
    <>
      <Form layout="inline" className={styles.controls} onFinish={handleSearch}>
        <Form.Item label="Sex" name="sex">
          <Select style={{ width: 100 }}>
            <Option value="0">Male</Option>
            <Option value="1">Female</Option>
          </Select>
        </Form.Item>
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
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={list}
        loading={isFetching}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.name}>
              <div className={styles.cardContent}>
                <img
                  src={
                    Number(item.sex) === SexTypeEnum.Male
                      ? maleImage
                      : femaleImage
                  }
                  alt={item.name}
                  className={styles.cardImage}
                />
                <div>
                  <p>Sex: {SexTypeEnum[item.sex]}</p>
                  <p>Age: {item.age}</p>
                  <p>Phone: {item.phone}</p>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};
