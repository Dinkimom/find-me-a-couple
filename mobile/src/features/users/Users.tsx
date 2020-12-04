import { Button, Icon, List, ListItem, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { UserDto } from '../../dtos/UserDto';
import { SexTypeEnum } from '../../enums/SexTypeEnum';
import { Filter } from '../../types/Filter';
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
        description={`${SexTypeEnum[Number(item.sex)]}, ${item.age} years`}
        accessoryLeft={renderItemIcon}
        accessoryRight={() => renderItemAccessory(item, item.isInvited)}
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
      <DateModal />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    maxHeight: '70%',
    overflow: 'hidden',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white',
  },
});
