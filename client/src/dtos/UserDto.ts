import { SexTypeEnum } from '../enums/SexTypeEnum';

export interface UserDto {
  _id: string;
  name: string;
  sex: SexTypeEnum;
  age: number;
  phone: string;
  email: string;
  isInvited?: boolean;
}
