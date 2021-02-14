import { SocketContext } from 'features/socketProvider/SocketProvider';
import { useContext } from 'react';
import { w3cwebsocket } from 'websocket';

export const useSocket = (): w3cwebsocket => {
    const socket = useContext(SocketContext).socket as w3cwebsocket;

    return socket;
};
