import { Image } from 'antd';
import React from 'react';
import { UserDto } from 'dtos/UserDto';
import { SexTypeEnum } from 'enums/SexTypeEnum';
import { useUserAvatar } from 'hooks/useUserAvatar';
import styles from './UserCard.module.css';

interface Props {
    user: UserDto;
}

export const UserCard: React.FC<Props> = ({ user }) => {
    const imageSrc = useUserAvatar(user);

    return (
        <div className={styles.userCard}>
            <Image src={imageSrc} className={styles.userAvatar} />
            <div className={styles.userCardInfo}>
                <h3>{user.name}</h3>

                <p>
                    {SexTypeEnum[user.sex]}, {user.age} years
                </p>
            </div>
        </div>
    );
};

UserCard.displayName = 'UserCard';
