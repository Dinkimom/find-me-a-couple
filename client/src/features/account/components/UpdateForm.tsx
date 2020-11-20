import { Button, Divider, Form, Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { RegisterDto } from '../../../dtos/RegisterDto';
import { remove, toggleUpdateForm, update } from '../accountSlice';
import { RegisterForm } from './RegisterForm';

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
      <Button block style={{ marginBottom: 16 }} onClick={handleToggle}>
        Profile
      </Button>

      <Modal
        title="Profile"
        visible={opened}
        onCancel={handleToggle}
        footer={null}
      >
        <RegisterForm
          defaultValues={user}
          onSubmit={handleSubmit}
          {...formState}
          footer={
            <>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={formState.isFetching}
                  style={{ marginRight: 16 }}
                >
                  Submit
                </Button>
                <Button htmlType="button" onClick={handleToggle}>
                  Cancel
                </Button>
              </Form.Item>
              <Divider />

              <Form.Item
                style={{
                  background: '#f0f0f0',
                  padding: 12,
                  textAlign: 'center',
                }}
              >
                <p style={{ margin: 0 }}>
                  You can{' '}
                  <Button
                    type="link"
                    onClick={handleRemove}
                    style={{ padding: 0 }}
                  >
                    delete your account
                  </Button>
                </p>
              </Form.Item>
            </>
          }
        />
      </Modal>
    </>
  );
};
