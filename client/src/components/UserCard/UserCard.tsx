import React from 'react';
import { UserDto } from '../../dtos/UserDto';
import { SexTypeEnum } from '../../enums/SexTypeEnum';

import maleImage from '../../assets/images/male.png';
import femaleImage from '../../assets/images/female.png';

import styles from './UserCard.module.css';
import { Image } from 'antd';

interface Props {
  user: UserDto;
}

export const UserCard: React.FC<Props> = ({ user }) => {
  let imageSrc = user.sex === SexTypeEnum.Male ? maleImage : femaleImage;

  if (user.image) {
    imageSrc = user.image;
  }

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
