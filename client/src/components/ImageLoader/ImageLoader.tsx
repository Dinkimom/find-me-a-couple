import { Form, Input, notification, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useContext, useEffect, useState } from 'react';
import { imageControl } from '../../App';
import { BaseFormContext } from '../BaseForm';
import styles from './ImageLoader.module.css';

export const ImageLoader: React.FC = () => {
  const { form, defaultValues } = useContext(BaseFormContext);

  useEffect(() => {
    if (defaultValues?.image) {
      setFileList([
        {
          uid: '1',
          url: defaultValues.image,
          status: 'done',
        },
      ]);
    }
  }, [defaultValues]);

  const [fileList, setFileList] = useState<any>([]);

  const onChange = ({ fileList }: any) => {
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
        },
      ]);
    } catch {
      notification.error({
        message: 'Could not save selected image. Please, try again',
      });
      setFileList([]);
    }
  };

  useEffect(() => {
    const values = form.getFieldsValue();

    form.setFieldsValue({
      ...values,
      image: fileList.length ? fileList[0].url : '',
    });
  }, [fileList]);

  return (
    <Form.Item
      name="image"
      label="Avatar"
      className={styles.root}
      shouldUpdate={true}
    >
      <Input type="hidden" />

      <ImgCrop rotate>
        <Upload
          listType="picture-card"
          onChange={onChange}
          fileList={fileList}
          customRequest={handleImageUpload}
        >
          {fileList.length !== 1 && '+ Upload'}
        </Upload>
      </ImgCrop>
    </Form.Item>
  );
};
