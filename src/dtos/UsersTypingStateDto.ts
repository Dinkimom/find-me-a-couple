export interface UsersTypingStateDto {
    // using object to provide status directly by the user_id
    [key: string]: boolean;
}
