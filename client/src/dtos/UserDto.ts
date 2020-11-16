import { SexTypeEnum } from '../enums/SexTypeEnum';

export interface UserDto {
  name: string;
  sex: SexTypeEnum;
  age: number;
  phone: string;
  email: string;
}
