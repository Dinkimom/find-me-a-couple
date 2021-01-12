import { SexEnum } from 'src/enums/SexEnum';

export interface UserDto {
  name: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  sex: SexEnum;
  image?: string;
}
