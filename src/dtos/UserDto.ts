import { SexEnum } from '@enums/SexEnum';

export interface UserDto {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  sex: SexEnum;
  image?: string;
}
