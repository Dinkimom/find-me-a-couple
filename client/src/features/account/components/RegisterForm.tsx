import { Button, Divider, Form, Input, InputNumber, Select } from 'antd';
import React, { useRef } from 'react';
import { useFormErrors } from '../../../hooks/useFormErrors';
import { BaseFormProps } from '../../../types/BaseForm';

const { Option } = Select;

export const RegisterForm: React.FC<BaseFormProps> = ({
  onSubmit,
  isFetching,
  error,
}) => {
  const formRef: any = useRef();

  const errorMessage = useFormErrors(error, formRef);

  return (
    <Form layout="vertical" name="basic" onFinish={onSubmit} ref={formRef}>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Age"
        name="age"
        rules={[{ required: true, message: 'Please input your age!' }]}
      >
        <InputNumber min={18} style={{ width: 100, float: 'left' }} />
      </Form.Item>

      <Form.Item
        label="Sex"
        name="sex"
        rules={[{ required: true, message: 'Please select your sex!' }]}
      >
        <Select style={{ width: 100, float: 'left' }}>
          <Option value="0">Male</Option>
          <Option value="1">Female</Option>
        </Select>
      </Form.Item>

      <Divider />

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please input real email' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      {errorMessage}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isFetching}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
