import React, { createContext, useContext } from 'react';
import { Socket } from 'socket.io-client';

interface SocketContextProps {
  socket: Socket;
  children: React.ReactNode;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('SocketContext error');
  }
  return context.socket;
};

export const SocketProvider: React.FC<SocketContextProps> = ({ socket, children }) => (
  <SocketContext.Provider value={{ socket, children }}>
    {children}
  </SocketContext.Provider>
);