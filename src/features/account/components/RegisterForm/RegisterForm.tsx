import { Divider, Form, Input, InputNumber, Select } from 'antd';
import React from 'react';
import { BaseForm, BaseFormProps } from '../../../../components/BaseForm';
import { ImageLoader } from '../../../../components/ImageLoader/ImageLoader';
import { PHONE_REGEX } from '../../../../constants/phoneRegex';
import styles from './RegisterForm.module.css';

const { Option } = Select;

export const RegisterForm: React.FC<BaseFormProps> = (props) => {
    return (
        <BaseForm {...props}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Age" name="age" rules={[{ required: true, message: 'Please input your age!' }]}>
                <InputNumber min={18} className={styles.field} />
            </Form.Item>

            <Form.Item label="Sex" name="sex" rules={[{ required: true, message: 'Please select your sex!' }]}>
                <Select className={styles.field}>
                    <Option value={0}>Male</Option>
                    <Option value={1}>Female</Option>
                </Select>
            </Form.Item>

            <ImageLoader />

            <Divider />

            <Form.Item
                label="Phone"
                name="phone"
                rules={[
                    { required: true, message: 'Please input your phone!' },
                    { pattern: PHONE_REGEX, message: 'Please input valid phone' },
                ]}
            >
                <Input />
            </Form.Item>

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

            <Form.Item label="New password" name="password">
                <Input.Password />
            </Form.Item>
        </BaseForm>
    );
};

RegisterForm.displayName = 'RegisterForm';
