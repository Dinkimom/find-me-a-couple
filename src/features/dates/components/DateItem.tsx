import { Button, Image, List, Tag, Typography } from 'antd';
import { DateDto } from 'dtos/DateDto';
import { UserDto } from 'dtos/UserDto';
import { DateStatusEnum } from 'enums/DateStatusEnum';
import { useUserAvatar } from 'hooks/useUserAvatar';
import React, { memo } from 'react';
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

export const DateItem: React.FC<Props> = memo(({ item, user, onStatusChange }) => {
    const isInviter = user?._id === item.inviter._id;

    const title = isInviter ? `You invited` : `You've been invited`;

    const userData = isInviter ? item.receiver : item.inviter;

    const userAvatar = useUserAvatar(userData);

    const renderStatusButton = (id: string, status: DateStatusEnum) => {
        switch (status) {
            case DateStatusEnum.Opened:
                if (isInviter) {
                    return [
                        <Button
                            onClick={() => onStatusChange(id, DateStatusEnum.Canceled)}
                            key={DateStatusEnum.Canceled}
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
                            key={DateStatusEnum.Accepted}
                        >
                            Accept
                        </Button>,
                        <Button
                            onClick={() => onStatusChange(id, DateStatusEnum.Declined)}
                            danger
                            key={DateStatusEnum.Declined}
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
                <Image src={userAvatar} className={styles.listItemAvatar} />

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
                <div className={styles.listItemControls}>{renderStatusButton(item._id, item.status)}</div>
            </div>
        </List.Item>
    );
});

DateItem.displayName = 'DateItem';
