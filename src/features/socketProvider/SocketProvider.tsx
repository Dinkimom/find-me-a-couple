import { RootState } from 'app/store';
import { fetchChats } from 'features/chat/chatsSlice';
import React, { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { chatActions } from 'socket/chat/chatActions';
import { mainActions } from 'socket/main/mainActions';
import { SocketAction } from 'types/socket-actions';
import { SocketReducer } from 'types/SocketReducer';
import { connectToWebSocket } from 'utils/connectToWebSocket';
import { IMessageEvent, w3cwebsocket } from 'websocket';

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

    const { loaded, list } = useSelector((state: RootState) => state.chats);

    const [users, setUsers] = useState<string[]>([]);

    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setSocket(connectToWebSocket());
        }
    }, [user]);

    if (socket && user) {
        socket.onopen = () => {
            socket.send(mainActions.init(user._id));
        };

        socket.onmessage = (message: IMessageEvent) => {
            if (socket && user) {
                const action: SocketAction = JSON.parse(message.data as string);

                reducers.forEach((reducer) => reducer({ user_id: user._id, action, dispatch, history, users, socket }));

                console.log(users);
            }
        };
    }

    // need to get chats to retrieve list of companions
    useEffect(() => {
        dispatch(fetchChats());
    }, []);

    useEffect(() => {
        if (socket && user && loaded) {
            const newUsers: string[] = [];

            list.forEach((item) => newUsers.push(item.companion._id));

            setUsers(newUsers);

            socket.send(chatActions.getUsers(user._id, newUsers));

            setInterval(() => socket.send(chatActions.updateUsers(user._id, newUsers)), 5000);
        }
    }, [user, loaded, list]);

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

SocketProvider.displayName = 'SocketProvider';
