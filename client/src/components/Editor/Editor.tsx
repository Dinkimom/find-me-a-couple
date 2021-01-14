import { Button, Form, Input } from 'antd';
import React from 'react';
import { MessageDto } from '../../dtos/MessageDto';
import styles from './Editor.module.css';

const { TextArea } = Input;

interface Props {
  onSubmit: (data: MessageDto) => void;
  submitting: boolean;
}

export const Editor: React.FC<Props> = ({ onSubmit, submitting }) => {
  const handleSubmit = (data: { text: string }) => {
    if (data.text) {
      onSubmit({ date: new Date(), text: data.text });
    }
  };

  return (
    <Form className={styles.root} onFinish={handleSubmit}>
      <Form.Item className={styles.control} name="text">
        <TextArea rows={2} maxLength={1000} />
      </Form.Item>
      <Form.Item className={styles.control}>
        <Button htmlType="submit" loading={submitting} type="primary" block>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};
