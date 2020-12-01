import React from 'react';
import { UserDto } from '../../dtos/UserDto';
import { SexTypeEnum } from '../../enums/SexTypeEnum';

import maleImage from '../../assets/images/male.png';
import femaleImage from '../../assets/images/female.png';

interface Props {
  user: UserDto;
}

export const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <>
      {/* <div>
      <h3>{user.name}</h3>

      <img
        src={Number(user.sex) === SexTypeEnum.Male ? maleImage : femaleImage}
        alt={user.name}
        className={styles.image}
      />

      <p>
        {SexTypeEnum[user.sex]}, {user.age} years
      </p>
    </div> */}
    </>
  );
};
