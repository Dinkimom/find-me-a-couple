import { RootState } from 'app/store';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketAction } from 'types/SocketAction';
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

  const dispatch = useDispatch();

  useEffect(() => {
    setSocket(connectToWebSocket());
  }, []);

  useEffect(() => {
    if (socket) {
      if (user) {
        socket.send(
          JSON.stringify({
            type: 'INIT',
            user_id: user._id,
          })
        );
      }

      socket.onclose = () => {
        setTimeout(() => setSocket(connectToWebSocket()), 1000);
      };

      socket.onmessage = (message) => {
        const data: SocketAction = JSON.parse(message.data as string);

        reducers.forEach((reducer) => reducer(data, dispatch));
      };
    }
  }, [dispatch, reducers, user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
