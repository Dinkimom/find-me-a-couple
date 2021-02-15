import { UserStateEnum } from 'enums/UserStateEnum';

export interface UsersStateDto {
    // using object to provide status directly by the user_id
    [key: string]: UserStateEnum;
}
