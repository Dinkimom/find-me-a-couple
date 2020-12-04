import { Button, Icon, List, ListItem, Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { DateDto } from '../../dtos/DateDto';
import { UserDto } from '../../dtos/UserDto';
import { DateStatusEnum } from '../../enums/DateStatusEnum';
import { SexTypeEnum } from '../../enums/SexTypeEnum';
import { fetch, update } from './datesSlice';

const tagsColors = {
  0: 'primary',
  1: 'danger',
  2: 'ghost',
  3: 'success',
};

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

  const renderItemAccessory = (isInvited?: boolean) => (
    <Button disabled={isInvited}>Invite</Button>
  );

  const renderItemIcon = (props) => <Icon {...props} name="person" />;

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
                status="ghost"
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
                  style={{ marginRight: 8 }}
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

        default:
          return null;
      }
    };

    return (
      <ListItem
        title={`${title}`}
        description={`${SexTypeEnum[Number(userData.sex)]}, ${
          user.age
        } years\nWhen: ${new Date(item.date).toLocaleDateString()}\n${
          item.status === DateStatusEnum.Accepted
            ? `Phone: ${userData.phone}, e-mail: ${userData.email}`
            : ''
        }`}
        accessoryLeft={renderItemIcon}
        accessoryRight={() => renderStatusButton(item._id, item.status)}
      />
    );
  };

  return (
    <>
      <Text category="h5" style={styles.title}>
        Dates
      </Text>
      <List
        data={list}
        renderItem={renderItem}
        style={styles.list}
        onRefresh={handleFetch}
        refreshing={isFetching}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
  list: {},
});
