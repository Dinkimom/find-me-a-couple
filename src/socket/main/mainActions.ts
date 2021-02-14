import { ActionCreator } from 'types/ActionCreator';
import { MainActionType } from './MainActionType';

export const mainActions: ActionCreator = {
    init(user_id: string) {
        return JSON.stringify({
            type: MainActionType.INIT,
            user_id,
        });
    },
};
