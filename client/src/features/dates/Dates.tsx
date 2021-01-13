import { Button, Image, List, Tag, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import femaleImage from '../../assets/images/female.png';
import maleImage from '../../assets/images/male.png';
import { DateStatusEnum } from '../../enums/DateStatusEnum';
import { SexTypeEnum } from '../../enums/SexTypeEnum';
import styles from './Dates.module.css';
import { fetch, update } from './datesSlice';

const { Title } = Typography;

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
  }, [dispatch]);

  return (
    <List
      className={styles.dates}
      itemLayout="horizontal"
      dataSource={list}
      loading={isFetching}
      renderItem={(item) => {
        const isInviter = user?._id === item.inviter._id;

        const title = isInviter ? `You invited` : `You've been invited`;

        const userData = isInviter ? item.receiver : item.inviter;

        let imageSrc =
          userData.image ||
          (userData.sex === SexTypeEnum.Male ? maleImage : femaleImage);

        const handleStatusChange = (id: string, status: DateStatusEnum) => {
          dispatch(update(id, { status }));
        };

        const renderStatusButton = (id: string, status: DateStatusEnum) => {
          switch (status) {
            case DateStatusEnum.Opened:
              if (isInviter) {
                return [
                  <Button
                    onClick={() =>
                      handleStatusChange(id, DateStatusEnum.Canceled)
                    }
                    className={styles.actionButton}
                  >
                    Cancel
                  </Button>,
                ];
              } else {
                return [
                  <Button
                    onClick={() =>
                      handleStatusChange(id, DateStatusEnum.Accepted)
                    }
                    className={styles.actionButton}
                    type="primary"
                    style={{ marginRight: 8 }}
                  >
                    Accept
                  </Button>,
                  <Button
                    onClick={() =>
                      handleStatusChange(id, DateStatusEnum.Declined)
                    }
                    className={styles.actionButton}
                    danger
                  >
                    Decline
                  </Button>,
                ];
              }

            default:
              return null;
          }
        };

        return (
          <List.Item className={styles.listItem}>
            <h3>
              {title}
              <Tag
                color={tagsColors[item.status]}
                className={styles.listItemTag}
              >
                {DateStatusEnum[Number(item.status)]}
              </Tag>
            </h3>

            <div className={styles.listItemContent}>
              <Image src={imageSrc} className={styles.listItemAvatar} />

              <div className={styles.listItemInfo}>
                <div className={styles.listItemInfoBox}>
                  <Title level={5}>{userData.name}</Title>
                  <span>123</span>
                </div>

                <div className={styles.listItemInfoBox}>
                  <h3>When?</h3>

                  <p>{new Date(item.date).toLocaleDateString()}</p>
                </div>

                {item.status === DateStatusEnum.Accepted && (
                  <div className={styles.listItemInfoBox}>
                    <h3>Contact info</h3>
                    <p>
                      {userData.email}, {userData.phone}
                    </p>
                  </div>
                )}
              </div>
              <div className={styles.listItemControls}>
                {renderStatusButton(item._id, item.status)}
              </div>
            </div>
          </List.Item>
        );
      }}
    />
  );
};
