import { Form, Input, notification } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { imageControl } from '../../App';
import { BaseFormContext } from '../BaseForm';
import styles from './ImageLoader.module.css';

export const ImageLoader: React.FC = () => {
  const [imageLink, setImageLink] = useState('');
  const [isFetching, setFetching] = useState(false);

  const ref = useRef<any>();

  const { form } = useContext(BaseFormContext);

  const { image } = form.getFieldsValue();

  useEffect(() => {
    setImageLink(image);
  }, [image]);

  const handleUploadClick = () => {
    ref.current.value = '';

    ref.current?.click();
  };

  const handleUploadFile = async () => {
    try {
      setFetching(true);

      const response = await imageControl.uploadImage(ref.current.files[0]);

      setImageLink(response.data.data.link);

      const values = form.getFieldsValue();

      form.setFieldsValue({ ...values, image: response.data.data.link });
    } catch {
      notification.error({
        message: 'Could not save selected image. Please, try again',
      });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    console.log(form.getFieldsValue());
  }, [form]);

  return (
    <>
      <Form.Item name="image" label="Avatar">
        <Input type="hidden" />

        <button type="button" onClick={handleUploadClick} disabled={isFetching}>
          {imageLink ? 'Update image' : 'Upload image'}
        </button>
      </Form.Item>

      <input
        type="file"
        className={styles.imageField}
        ref={ref}
        onChange={handleUploadFile}
        accept="image/x-png,image/gif,image/jpeg"
      />

      {imageLink && (
        <img
          src={imageLink}
          alt="profile-avatar"
          style={{ width: 200, height: 'auto' }}
        />
      )}
    </>
  );
};
