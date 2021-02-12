/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form } from 'antd';
import { FormInstance, useForm } from 'antd/lib/form/Form';
import React, { createContext, ReactNode, RefObject, useEffect, useRef } from 'react';
import { ErrorDto } from 'dtos/ErrorDto';
import { useFormErrors } from 'hooks/useFormErrors';

export const BaseFormContext = createContext<{
    form: FormInstance | null;
    defaultValues: any;
}>({
    form: null,
    defaultValues: null,
});

export interface BaseFormProps {
    isFetching: boolean;
    error: ErrorDto | null;
    onSubmit: (data: any) => void;
    children?: ReactNode | null;
    defaultValues?: any;
    footer?: ReactNode;
}

export const BaseForm: React.FC<BaseFormProps> = ({ isFetching, error, onSubmit, children, defaultValues, footer }) => {
    const formRef: RefObject<FormInstance> | null = useRef(null);

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
    }, [defaultValues, form]);

    if (!form) {
        return null;
    }

    return (
        <Form layout="vertical" name="basic" onFinish={onSubmit} ref={formRef} form={form}>
            <BaseFormContext.Provider value={{ form, defaultValues }}>
                {children}

                {errorMessage}

                {renderFooter()}
            </BaseFormContext.Provider>
        </Form>
    );
};

BaseForm.displayName = 'BaseForm';
