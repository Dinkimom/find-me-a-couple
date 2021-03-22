import { Form, Input, notification, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useContext, useEffect, useState } from 'react';
import { imageControl } from 'services';
import { BaseFormContext } from '../BaseForm';
import styles from './ImageLoader.module.css';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

export const ImageLoader: React.FC = () => {
    const { form, defaultValues } = useContext(BaseFormContext);

    useEffect(() => {
        if (defaultValues?.image) {
            setFileList([
                {
                    uid: '1',
                    url: defaultValues.image,
                    status: 'done',
                } as Partial<UploadFile>,
            ]);
        }
    }, [defaultValues]);

    const [fileList, setFileList] = useState<Partial<UploadFile>[]>([]);

    const onChange = ({ fileList }: UploadChangeParam<Partial<UploadFile>>) => {
        setFileList(fileList);
    };

    const handleImageUpload = async (payload: { file: File }) => {
        try {
            const response = await imageControl.uploadImage(payload.file);

            const url = response.data.data.link;

            setFileList([
                {
                    uid: '1',
                    url,
                    status: 'done',
                } as Partial<UploadFile>,
            ]);
        } catch {
            notification.error({
                message: 'Could not save selected image. Please, try again',
            });
            setFileList([]);
        }
    };

    useEffect(() => {
        const values = form?.getFieldsValue();

        form?.setFieldsValue({
            ...values,
            image: fileList.length ? fileList[0].url : '',
        });
    }, [fileList, form]);

    return (
        <Form.Item name="image" label="Avatar" className={styles.root} shouldUpdate={true}>
            <Input type="hidden" />

            <ImgCrop rotate>
                <Upload
                    listType="picture-card"
                    onChange={onChange}
                    fileList={fileList as UploadFile[]}
                    customRequest={handleImageUpload}
                >
                    {fileList.length !== 1 && '+ Upload'}
                </Upload>
            </ImgCrop>
        </Form.Item>
    );
};

ImageLoader.displayName = 'ImageLoader';
