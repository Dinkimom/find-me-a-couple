import { SendOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { MessageDto } from 'dtos/MessageDto';
import React from 'react';
import styles from './Editor.module.css';

const { TextArea } = Input;

interface Props {
  onSubmit: (data: MessageDto) => void;
  submitting: boolean;
  disabled?: boolean;
}

export const Editor: React.FC<Props> = ({ onSubmit, submitting, disabled }) => {
  const [form] = useForm();

  const handleSubmit = (data: { text: string }) => {
    if (data.text) {
      onSubmit({ date: new Date(), text: data.text.trim() });
      form.resetFields();
    }
  };

  const handleFormEnter = (e: any) => {
    if (!e.shiftKey) {
      form.submit();
    }
  };

  return (
    <Form className={styles.root} onFinish={handleSubmit} form={form}>
      <Form.Item className={styles.control} name="text">
        <TextArea
          showCount={true}
          rows={1}
          autoSize={{ minRows: 1, maxRows: 3 }}
          maxLength={1000}
          onPressEnter={handleFormEnter}
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item className={styles.control}>
        <Button
          htmlType="submit"
          loading={submitting}
          type="primary"
          icon={<SendOutlined />}
          block
          disabled={disabled}
        />
      </Form.Item>
    </Form>
  );
};
