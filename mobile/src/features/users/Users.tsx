import { Button, Icon, List, ListItem, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { UserDto } from '../../dtos/UserDto';
import { SexTypeEnum } from '../../enums/SexTypeEnum';
import { Filter } from '../../types/Filter';
import { toggleCreateForm } from '../dates/datesSlice';
import { fetch } from './usersSlice';

export const Users: React.FC = () => {
  const { list, isFetching } = useSelector((state: RootState) => state).users;

  const [filter, setFilter] = useState<Filter>();

  const dispatch = useDispatch();

  const handleFetch = () => {
    dispatch(fetch(filter));
  };

  useEffect(() => {
    handleFetch();
  }, [filter]);

  const handleInvite = (receiver: UserDto) => {
    dispatch(toggleCreateForm(receiver));
  };

  const renderItemAccessory = (isInvited?: boolean) => (
    <Button disabled={isInvited}>Invite</Button>
  );

  const renderItemIcon = (props) => <Icon {...props} name="person" />;

  const renderItem = ({ item }: { item: UserDto }) => {
    return (
      <ListItem
        title={`${item.name}`}
        description={`${SexTypeEnum[Number(item.sex)]}, ${item.age} years`}
        accessoryLeft={renderItemIcon}
        accessoryRight={() => renderItemAccessory(item.isInvited)}
      />
    );
  };

  return (
    <>
      <Text category="h5" style={styles.title}>
        Users
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
