import { UserDto } from '@dtos/UserDto';
import { Request } from 'express';

export type UserRequest = Request & {
  user: UserDto;
};
