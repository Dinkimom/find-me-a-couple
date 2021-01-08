import { Button, Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { createContext, ReactNode, useEffect, useRef } from 'react';
import { ErrorDto } from '../dtos/ErrorDto';
import { useFormErrors } from '../hooks/useFormErrors';

export const BaseFormContext = createContext<{
  form: any;
  extra: any;
  defaultValues: any;
}>({
  form: null,
  extra: null,
  defaultValues: null,
});

export interface BaseFormProps {
  isFetching: boolean;
  error: ErrorDto | null;
  onSubmit: (data: any) => void;
  children?: ReactNode | null;
  defaultValues?: { [key: string]: any } | null;
  footer?: ReactNode;
  extra?: any;
}

export const BaseForm: React.FC<BaseFormProps> = ({
  isFetching,
  error,
  onSubmit,
  children,
  defaultValues,
  footer,
  extra,
}) => {
  const formRef: any = useRef();

  const [form] = useForm();

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

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(defaultValues);
  }, [defaultValues, extra, form]);

  return (
    <Form
      layout="vertical"
      name="basic"
      onFinish={onSubmit}
      ref={formRef}
      form={form}
    >
      <BaseFormContext.Provider value={{ form, defaultValues, extra }}>
        {children}

        {errorMessage}

        {renderFooter()}
      </BaseFormContext.Provider>
    </Form>
  );
};
