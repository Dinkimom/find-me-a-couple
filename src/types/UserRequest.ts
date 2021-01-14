import { UserDto } from '@dtos/UserDto';
import { Request } from 'express';

export interface UserRequest extends Request {
  user: UserDto;
}
