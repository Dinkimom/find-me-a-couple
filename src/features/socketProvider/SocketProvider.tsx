import { RootState } from 'app/store';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { mainActions } from 'socket/main/mainActions';
import { SocketAction } from 'types/socket-actions';
import { SocketReducer } from 'types/SocketReducer';
import { connectToWebSocket } from 'utils/connectToWebSocket';
import { w3cwebsocket } from 'websocket';

export const SocketContext = createContext<{
    socket: w3cwebsocket | null;
}>({ socket: null });

interface Props {
    reducers: SocketReducer[];
    children: ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ reducers, children }) => {
    const [socket, setSocket] = useState<w3cwebsocket | null>(null);

    const { user } = useSelector((state: RootState) => state.account);

    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) {
            setSocket(connectToWebSocket());
        }
    }, []);

    useEffect(() => {
        if (socket) {
            if (user) {
                socket.send(mainActions.init(user._id));
            }

            socket.onclose = () => {
                setTimeout(() => setSocket(connectToWebSocket()), 1000);
            };

            socket.onmessage = (message) => {
                const action: SocketAction = JSON.parse(message.data as string);

                reducers.forEach((reducer) => reducer({ action, dispatch, history }));
            };
        }
    }, [dispatch, reducers, user, socket]);

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

SocketProvider.displayName = 'SocketProvider';
