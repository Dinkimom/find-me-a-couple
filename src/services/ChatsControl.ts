import { AxiosResponse } from 'axios';
import { MessageDto } from 'dtos/MessageDto';
import { EntityEnum } from 'enums/EntityEnum';
import { AbstractControl } from './AbstractControl';

export class ChatsControl extends AbstractControl {
    constructor() {
        super(EntityEnum.Chats);
    }

    public getChats = (): Promise<AxiosResponse> => {
        return this.axios.get('/');
    };

    public getChat = (data: string): Promise<AxiosResponse> => {
        return this.axios.get(`/${data}`);
    };

    public sendMessage = (receiver: string, data: MessageDto): Promise<AxiosResponse> => {
        return this.axios.post(`/${receiver}`, data);
    };
}
