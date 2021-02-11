import { Button, Image, List, Tag, Typography } from 'antd';
import React, { memo } from 'react';
import { DateDto } from 'dtos/DateDto';
import { UserDto } from 'dtos/UserDto';
import { DateStatusEnum } from 'enums/DateStatusEnum';
import { SexTypeEnum } from 'enums/SexTypeEnum';
import femaleImage from 'assets/images/female.png';
import maleImage from 'assets/images/male.png';
import styles from './DateItem.module.css';

const { Title } = Typography;

const tagsColors = {
  0: '#108ee9',
  1: '#f50',
  2: 'lightgrey',
  3: '#87d068',
};

interface Props {
  item: DateDto;
  user: UserDto | null;
  onStatusChange: (id: string, status: DateStatusEnum) => void;
}

export const DateItem: React.FC<Props> = memo(
  ({ item, user, onStatusChange }) => {
    const isInviter = user?._id === item.inviter._id;

    const title = isInviter ? `You invited` : `You've been invited`;

    const userData = isInviter ? item.receiver : item.inviter;

    let imageSrc =
      userData.image ||
      (userData.sex === SexTypeEnum.Male ? maleImage : femaleImage);

    const renderStatusButton = (id: string, status: DateStatusEnum) => {
      switch (status) {
        case DateStatusEnum.Opened:
          if (isInviter) {
            return [
              <Button
                onClick={() => onStatusChange(id, DateStatusEnum.Canceled)}
              >
                Cancel
              </Button>,
            ];
          } else {
            return [
              <Button
                onClick={() => onStatusChange(id, DateStatusEnum.Accepted)}
                type="primary"
                style={{ marginRight: 8 }}
              >
                Accept
              </Button>,
              <Button
                onClick={() => onStatusChange(id, DateStatusEnum.Declined)}
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
          <Tag color={tagsColors[item.status]} className={styles.listItemTag}>
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
  }
);
