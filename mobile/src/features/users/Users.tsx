import { Button, Icon, ListItem } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { BaseList } from '../../components/BaseList';
import { UserDto } from '../../dtos/UserDto';
import { SexTypeEnum } from '../../enums/SexTypeEnum';
import { toggleCreateForm } from '../dates/datesSlice';
import { DateModal } from './components/DateModal';
import { fetch } from './usersSlice';

export const Users: React.FC = () => {
  const { list, isFetching } = useSelector((state: RootState) => state).users;

  const dispatch = useDispatch();

  const handleFetch = () => {
    dispatch(fetch());
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleInvite = (receiver: UserDto) => {
    dispatch(toggleCreateForm(receiver));
  };

  const renderItemAccessory = (receiver: UserDto, isInvited?: boolean) => (
    <Button disabled={isInvited} onPress={() => handleInvite(receiver)}>
      Invite
    </Button>
  );

  const renderItemIcon = (props) => <Icon {...props} name="person" />;

  const renderItem = ({ item }: { item: UserDto }) => {
    return (
      <ListItem
        title={`${item.name}`}
        description={`${SexTypeEnum[item.sex]}, ${item.age} years`}
        accessoryLeft={renderItemIcon}
        accessoryRight={() => renderItemAccessory(item, item.isInvited)}
      />
    );
  };

  return (
    <>
      <BaseList
        data={list}
        renderItem={renderItem}
        onRefresh={handleFetch}
        refreshing={isFetching}
      />
      <DateModal />
    </>
  );
};
