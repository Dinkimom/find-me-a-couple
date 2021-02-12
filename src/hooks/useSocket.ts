import { MessageDto } from 'dtos/MessageDto';
import { SocketContext } from 'features/socketProvider/SocketProvider';
import { useContext } from 'react';
import { w3cwebsocket } from 'websocket';

// Let typescript generate actions object automatically
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSocket = () => {
    const socket = useContext(SocketContext).socket as w3cwebsocket;

    const sendMessage = (user_id: string, receiver: string, message: MessageDto) => {
        socket.send(
            JSON.stringify({
                user_id,
                type: 'POST',
                payload: {
                    receiver,
                    message,
                },
            }),
        );
    };

    return {
        socket,
        actions: {
            sendMessage,
        },
    };
};
