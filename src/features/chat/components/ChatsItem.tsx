import { List, Avatar, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { ChatDto } from 'dtos/ChatDto';
import { useUserAvatar } from 'hooks/useUserAvatar';
import styles from './ChatsItem.module.css';

const { Title } = Typography;

interface Props extends ChatDto {
    onClick: (receiver: string) => void;
}

export const ChatsItem: React.FC<Props> = ({ companion, lastMessage, onClick }) => {
    const { user } = useSelector((state: RootState) => state.account);

    const companionImage = useUserAvatar(companion);

    return (
        <List.Item className={styles.chat} onClick={() => onClick(companion._id)}>
            <Avatar src={companionImage} className={styles.chatAvatar} />
            <div className={styles.chatContent}>
                <Title level={5}>{companion.name}</Title>

                <p>
                    {lastMessage.user_id === user?._id ? 'You' : companion.name}: {lastMessage.text}
                </p>

                <span className={styles.chatDate}>
                    {new Date(lastMessage.date).toLocaleTimeString()} {new Date(lastMessage.date).toLocaleDateString()}
                </span>
            </div>
        </List.Item>
    );
};

ChatsItem.displayName = 'ChatItem';
