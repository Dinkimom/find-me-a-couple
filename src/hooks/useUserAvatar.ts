import { UserDto } from 'dtos/UserDto';
import { SexTypeEnum } from 'enums/SexTypeEnum';

import maleImage from 'assets/images/male.png';
import femaleImage from 'assets/images/female.png';

export const useUserAvatar = (user: UserDto | null | undefined): string | undefined => {
    if (!user) {
        return undefined;
    }

    if (user.image) {
        return user.image;
    }

    return user.sex === SexTypeEnum.Male ? maleImage : femaleImage;
};
