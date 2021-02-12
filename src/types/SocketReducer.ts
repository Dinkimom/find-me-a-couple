import { NotificationInstance } from 'antd/lib/notification';
import { Dispatch } from 'react';
import { SocketAction } from './SocketAction';

export type SocketReducer<T = any> = (config: {
  action: SocketAction<T>;
  dispatch: Dispatch<any>;
  notification: NotificationInstance;
}) => void;
