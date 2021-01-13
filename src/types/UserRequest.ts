import { UserDto } from '@dtos/UserDto';
import { Request } from 'express';

export interface UserRequest<T> extends Request<T> {
  user: UserDto;
}
