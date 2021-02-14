import { NewMessageDto } from './NewMessageDto';

export interface MessageDto extends NewMessageDto {
    user_id: string;
}
