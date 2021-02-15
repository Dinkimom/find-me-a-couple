/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'react';
import { w3cwebsocket } from 'websocket';
import { SocketAction } from './socket-actions';

export type SocketReducer<T = any> = (config: {
    user_id: string;
    action: SocketAction<T>;
    dispatch: Dispatch<any>;
    history: any;
    users: string[];
    socket: w3cwebsocket;
}) => void;
