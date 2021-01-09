import { Button, DatePicker, Form, Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { BaseForm } from '../../../components/BaseForm';
import { UserCard } from '../../../components/UserCard/UserCard';
import { NewDateDto } from '../../../dtos/NewDateDto';
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
    dispatch(toggleCreateForm());
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
      destroyOnClose={true}
    >
      <BaseForm
        onSubmit={handleSubmit}
        {...formState}
        footer={null}
        extra={{ opened }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          {receiver && <UserCard user={receiver} />}
        </div>

        <div style={{ display: 'flex' }}>
          <Form.Item
            name="date"
            rules={[
              {
                type: 'date',
                min: Number(new Date()),
                message: 'Selected date must be valid',
              },
              {
                required: true,
                message: 'Please, input date',
              },
            ]}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <DatePicker placeholder="Select date" style={{ width: 200 }} />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={formState.isFetching}
            style={{ marginLeft: 16, width: 100 }}
          >
            Submit
          </Button>
        </div>
      </BaseForm>
    </Modal>
  );
};
