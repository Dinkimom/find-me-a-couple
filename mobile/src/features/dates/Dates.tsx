import { Button, Card, Divider, List, Tag } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { UserCard } from '../../components/UserCard/UserCard';
import { DateStatusEnum } from '../../enums/DateStatusEnum';
import { fetch, update } from './datesSlice';

const tagsColors = {
  0: '#108ee9',
  1: '#f50',
  2: 'lightgrey',
  3: '#87d068',
};

export const Dates: React.FC = () => {
  const { list, isFetching } = useSelector((state: RootState) => state.dates);

  const { user } = useSelector((state: RootState) => state.account);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch());
  }, []);

  return (
    <>
      {/* // <List
    //   grid={{
    //     gutter: 16,
    //     xs: 1,
    //     sm: 2,
    //     md: 4,
    //     lg: 4,
    //     xl: 6,
    //     xxl: 3,
    //   }}
    //   dataSource={list}
    //   loading={isFetching}
    //   renderItem={(item) => {
    //     const isInviter = user?._id === item.inviter._id;

    //     const title = isInviter ? `You invited` : `You've been invited by`;

    //     const userData = isInviter ? item.receiver : item.inviter;

    //     const handleStatusChange = (id: string, status: DateStatusEnum) => {
    //       dispatch(update(id, { status }));
    //     };

    //     const renderStatusButton = (id: string, status: DateStatusEnum) => {
    //       switch (status) {
    //         case DateStatusEnum.Opened:
    //           if (isInviter) {
    //             return (
    //               <Button
    //                 onClick={() =>
    //                   handleStatusChange(id, DateStatusEnum.Canceled)
    //                 }
    //                 block
    //               >
    //                 Cancel
    //               </Button>
    //             );
    //           } else {
    //             return (
    //               <>
    //                 <Button
    //                   onClick={() =>
    //                     handleStatusChange(id, DateStatusEnum.Accepted)
    //                   }
    //                   style={{ width: 100, marginRight: 8 }}
    //                 >
    //                   Accept
    //                 </Button>
    //                 <Button
    //                   onClick={() =>
    //                     handleStatusChange(id, DateStatusEnum.Declined)
    //                   }
    //                   style={{
    //                     width: 100,
    //                     marginLeft: 8,
    //                   }}
    //                 >
    //                   Decline
    //                 </Button>
    //               </>
    //             );
    //           }

    //         default:
    //           return null;
    //       }
    //     };

    //     return (
    //       <List.Item>
    //         <Card style={{ minHeight: 550 }}>
    //           <Tag
    //             color={tagsColors[item.status]}
    //             style={{ marginBottom: 16, marginRight: 0 }}
    //           >
    //             {DateStatusEnum[Number(item.status)]}
    //           </Tag>
    //           <h3>{title}</h3>
    //           <UserCard user={userData} />

    //           {item.status === DateStatusEnum.Accepted && (
    //             <>
    //               <h3>Contact info</h3>
    //               <p>
    //                 {userData.email}, {userData.phone}
    //               </p>
    //             </>
    //           )}

    //           <h3>When?</h3>

    //           <p>{new Date(item.date).toLocaleDateString()}</p>

    //           {renderStatusButton(item._id, item.status)}
    //         </Card>
    //       </List.Item>
    //     );
    //   }}
    // /> */}
    </>
  );
};
