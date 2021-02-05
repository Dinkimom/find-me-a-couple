import { UserDto } from './UserDto';

export interface RegisterDto extends UserDto {
  password: string;
}
