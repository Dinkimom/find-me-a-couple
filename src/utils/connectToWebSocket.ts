import { WEB_SOCKETS_ENTRY_POINT } from 'constants/webSocketsEntryPoint';
import { w3cwebsocket } from 'websocket';

export const connectToWebSocket = (): w3cwebsocket => {
    return new w3cwebsocket(WEB_SOCKETS_ENTRY_POINT, 'echo-protocol');
};
