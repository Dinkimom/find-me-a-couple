import { Dispatch } from 'react';
import { SocketAction } from './SocketAction';

export type SocketReducer<T = any> = (
  action: SocketAction<T>,
  dispatch: Dispatch<any>
) => void;
