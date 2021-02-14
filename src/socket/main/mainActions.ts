import { MainActionType } from './MainActionType';

export const mainActions = {
    init(user_id: string) {
        return JSON.stringify({
            type: MainActionType.INIT,
            user_id,
        });
    },
};
