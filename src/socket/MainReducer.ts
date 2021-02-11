import { SocketReducer } from 'types/SocketReducer';

export const mainReducer: SocketReducer = (action, dispatch) => {
  if (action.status === 404) {
    window.location.href = '/not-found';
  }
};
