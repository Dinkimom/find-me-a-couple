import { notification } from 'antd';
import { MessageDto } from 'dtos/MessageDto';
import { UserDto } from 'dtos/UserDto';
import { useUserAvatar } from 'hooks/useUserAvatar';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PATHS } from 'utils/route-helpers';
import { default as classes, default as styles } from './UserMessage.module.css';

interface Props {
    message: MessageDto;
    user: UserDto;
}

export const UserMessage: React.FC<Props> = ({ message, user }) => {
    const avatarUrl = useUserAvatar(user);

    const history = useHistory();

    const handleMessageClick = () => {
        history.push(`${PATHS.CHATS}/${user._id}`);
        notification.destroy();
    };

    return (
        <div className={styles.root} onClick={handleMessageClick}>
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
