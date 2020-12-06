import { Button, ListItem, Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { BaseList } from '../../components/BaseList';
import { DateDto } from '../../dtos/DateDto';
import { DateStatusEnum } from '../../enums/DateStatusEnum';
import { SexTypeEnum } from '../../enums/SexTypeEnum';
import { fetch, update } from './datesSlice';

export const Dates: React.FC = () => {
  const { list, isFetching } = useSelector((state: RootState) => state.dates);

  const { user } = useSelector((state: RootState) => state.account);

  const dispatch = useDispatch();

  const handleFetch = () => {
    dispatch(fetch());
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const renderItem = ({ item }: { item: DateDto }) => {
    const isInviter = user?._id === item.inviter._id;

    const userData = isInviter ? item.receiver : item.inviter;

    const title = isInviter
      ? `You invited ${userData.name}`
      : `You've been invited by ${userData.name}`;

    const handleStatusChange = (id: string, status: DateStatusEnum) => {
      dispatch(update(id, { status }));
    };

    const renderStatusButton = (id: string, status: DateStatusEnum) => {
      switch (status) {
        case DateStatusEnum.Opened:
          if (isInviter) {
            return (
              <Button
                onPress={() => handleStatusChange(id, DateStatusEnum.Canceled)}
                status="basic"
              >
                Cancel
              </Button>
            );
          } else {
            return (
              <>
                <Button
                  onPress={() =>
                    handleStatusChange(id, DateStatusEnum.Accepted)
                  }
                  status="success"
                >
                  Accept
                </Button>
                <Button
                  onPress={() =>
                    handleStatusChange(id, DateStatusEnum.Declined)
                  }
                  status="danger"
                  style={{
                    marginLeft: 8,
                  }}
                >
                  Decline
                </Button>
              </>
            );
          }

        case DateStatusEnum.Canceled:
          return <Text appearance="hint">Canceled</Text>;

        case DateStatusEnum.Declined:
          return <Text status="danger">Declined</Text>;

        case DateStatusEnum.Accepted:
          return <Text status="success">Accepted</Text>;

        default:
          return null;
      }
    };

    return (
      <ListItem
        title={`${title}`}
        description={`${SexTypeEnum[userData.sex]}, ${
          user.age
        } years\nWhen: ${new Date(item.date).toLocaleDateString()}\n${
          item.status === DateStatusEnum.Accepted
            ? `Phone: ${userData.phone}, e-mail: ${userData.email}`
            : ''
        }`}
        accessoryRight={() => renderStatusButton(item._id, item.status)}
      />
    );
  };

  return (
    <BaseList
      data={list}
      renderItem={renderItem}
      onRefresh={handleFetch}
      refreshing={isFetching}
    />
  );
};
