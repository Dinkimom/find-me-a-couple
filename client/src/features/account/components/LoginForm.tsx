import { Form, Input } from 'antd';
import React from 'react';
import { BaseForm, BaseFormProps } from '../../../components/BaseForm';

export const LoginForm: React.FC<BaseFormProps> = (props) => {
  return (
    <BaseForm {...props}>
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
    </BaseForm>
  );
};
