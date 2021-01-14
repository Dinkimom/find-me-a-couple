import { Button, Form, Input } from 'antd';
import React, { ChangeEvent } from 'react';
const { TextArea } = Input;

interface Props {
  onChange: (e: ChangeEvent) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

export const Editor: React.FC<Props> = ({
  onChange,
  onSubmit,
  submitting,
  value,
}) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);
