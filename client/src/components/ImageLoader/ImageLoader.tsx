import { Form } from 'antd';
import React, { useState } from 'react';
import styles from './ImageLoader.module.css';

export const ImageLoader: React.FC = () => {
  const [imageLink, setImageLink] = useState('');

  return (
    <div>
      <Form.Item>
        <input
          type="hidden"
          name="image"
          value={imageLink}
          className={styles.imageField}
        />
      </Form.Item>

      <button>{imageLink ? 'Upload image' : 'Update image'}</button>

      <input type="file" className={styles.imageField} />

      {imageLink && <img src={imageLink} alt="profile-avatar" />}
    </div>
  );
};
