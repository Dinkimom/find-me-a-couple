import { Button, DatePicker, Form, Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { BaseForm } from '../../../components/BaseForm';
import { UserCard } from '../../../components/UserCard/UserCard';
import { NewDateDto } from '../../../dtos/NewDateDto';
import { SexTypeEnum } from '../../../enums/SexTypeEnum';
import { create, toggleCreateForm } from '../datesSlice';

export const CreateDateForm: React.FC = () => {
  const { opened, ...formState } = useSelector(
    (state: RootState) => state.dates.createForm
  );
  const { receiver } = useSelector(
    (state: RootState) => state.dates.createForm
  );
  const { user } = useSelector((state: RootState) => state.account);

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleCreateForm(null));
  };

  const handleSubmit = (data: NewDateDto) => {
    if (user && receiver) {
      dispatch(create({ ...data, inviter: user._id, receiver: receiver._id }));
    }
  };

  return (
    <Modal
      title="New Date"
      visible={opened}
      onCancel={handleToggle}
      footer={null}
      style={{ maxWidth: 400, textAlign: 'center' }}
    >
      <BaseForm
        onSubmit={handleSubmit}
        {...formState}
        footer={
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
        }
      >
        <div style={{ textAlign: 'center' }}>
          {receiver && <UserCard user={receiver} />}
        </div>

        <Form.Item
          name="date"
          rules={[
            {
              type: 'date',
              min: Number(new Date()),
              message: 'Selected date must be valid',
            },
          ]}
        >
          <DatePicker placeholder="Select date" />
        </Form.Item>
      </BaseForm>
    </Modal>
  );
};
