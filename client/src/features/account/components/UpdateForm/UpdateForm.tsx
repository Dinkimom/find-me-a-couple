import { ProfileOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { RegisterDto } from '../../../../dtos/RegisterDto';
import { remove, toggleUpdateForm, update } from '../../accountSlice';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import styles from './UpdateForm.module.css';

export const UpdateForm = () => {
  const { opened, ...formState } = useSelector(
    (state: RootState) => state.account.updateForm
  );

  const { user } = useSelector((state: RootState) => state.account);

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleUpdateForm());
  };

  const handleSubmit = (data: RegisterDto) => {
    dispatch(update(user?._id || '', data));
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      dispatch(remove(user?._id || ''));
    }
  };

  return (
    <>
      <Button
        block
        className={styles.toggleButton}
        onClick={handleToggle}
        type="text"
        icon={<ProfileOutlined />}
      >
        Profile
      </Button>

      <Modal
        title="Profile"
        visible={opened}
        onCancel={handleToggle}
        footer={null}
        destroyOnClose={true}
      >
        <RegisterForm
          defaultValues={user}
          onSubmit={handleSubmit}
          extra={{ opened }}
          {...formState}
          footer={
            <>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={formState.isFetching}
                  className={styles.submitButton}
                >
                  Submit
                </Button>
                <Button htmlType="button" onClick={handleToggle}>
                  Cancel
                </Button>
              </Form.Item>
              <Divider />

              <Form.Item className={styles.deleteUserBlock}>
                <span>
                  You can{' '}
                  <Button type="link" onClick={handleRemove}>
                    delete your account
                  </Button>
                </span>
              </Form.Item>
            </>
          }
        />
      </Modal>
    </>
  );
};
