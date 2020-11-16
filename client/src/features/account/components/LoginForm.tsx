import { Button, Form, Input } from 'antd';
import React, { useRef } from 'react';
import { useFormErrors } from '../../../hooks/useFormErrors';
import { BaseFormProps } from '../../../types/BaseForm';

export const LoginForm: React.FC<BaseFormProps> = ({
  onSubmit,
  isFetching,
  error,
}) => {
  const formRef: any = useRef();

  const errorMessage = useFormErrors(error, formRef);

  return (
    <Form layout="vertical" name="basic" onFinish={onSubmit} ref={formRef}>
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
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};
