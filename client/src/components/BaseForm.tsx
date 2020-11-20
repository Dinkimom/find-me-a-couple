import { Button, Form } from 'antd';
import React, { ReactNode, useRef } from 'react';
import { ErrorDto } from '../dtos/ErrorDto';
import { useFormErrors } from '../hooks/useFormErrors';

export interface BaseFormProps {
  isFetching: boolean;
  error: ErrorDto | null;
  onSubmit: (data: any) => void;
  children?: ReactNode | null;
  defaultValues?: { [key: string]: any } | null;
  footer?: ReactNode;
}

export const BaseForm: React.FC<BaseFormProps> = ({
  isFetching,
  error,
  onSubmit,
  children,
  defaultValues,
  footer,
}) => {
  const formRef: any = useRef();

  const errorMessage = useFormErrors(error, formRef);

  const renderFooter = () => {
    if (footer === undefined) {
      return (
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isFetching}>
            Submit
          </Button>
        </Form.Item>
      );
    }

    return footer;
  };

  return (
    <Form
      layout="vertical"
      name="basic"
      onFinish={onSubmit}
      initialValues={defaultValues as any}
      ref={formRef}
    >
      {children}

      {errorMessage}

      {renderFooter()}
    </Form>
  );
};
