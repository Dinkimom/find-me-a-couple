import { MessageDto } from 'dtos/MessageDto';
import { UserDto } from 'dtos/UserDto';
import { useUserAvatar } from 'hooks/useUserAvatar';
import React from 'react';
import { default as classes, default as styles } from './UserMessage.module.css';

interface Props {
    message: MessageDto;
    user: UserDto;
}

export const UserMessage: React.FC<Props> = ({ message, user }) => {
    const avatarUrl = useUserAvatar(user);

    return (
        <div className={styles.root}>
            <h4>New message</h4>
            <div className={styles.userInfo}>
                <img src={avatarUrl} alt={user.name} width={32} height={32} className={styles.userAvatar} />
                <p>{user.name}</p>
            </div>
            <p className={classes.messageText}>{message.text}</p>
        </div>
    );
};

UserMessage.displayName = 'UserMessage';
