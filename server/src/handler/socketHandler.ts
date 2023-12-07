import { Server, Socket } from 'socket.io';
import { User, IMessage } from '../model/types';

const activeUsers: User[] = [];
const messages: IMessage[] = [];

export const handleSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`${socket.id} user connected`);
    io.to(socket.id).emit('addNewUser', activeUsers);
    io.to(socket.id).emit('messages', messages);

    socket.on('disconnect', () => {
      handleDisconnect(socket, io);
    });

    socket.on('message', (data: IMessage) => {
      handleNewMessage(data, io);
    });

    socket.on('newUser', (data: { name: string; id: string }) => {
      handleNewUser(data, io, socket);
    });

    socket.on('leaveChat', (socketID: string) => {
      handleLeaveChat(socket, socketID, io);
    });
  });
};

const handleDisconnect = (socket: Socket, io: Server) => {
  console.log(`${socket.id} disconnected`);
  const index = activeUsers.findIndex((user) => user.id === socket.id);
  const disconnectedUser = activeUsers.find((user) => user.id === socket.id);
  if (disconnectedUser) {
    activeUsers.splice(index, 1);
    io.emit('addNewUser', activeUsers);
    const disconnectMessage = {
      text: `${disconnectedUser.name} покинул чат.`,
      name: disconnectedUser.name,
      messageID: disconnectedUser.id,
      socketID: socket.id,
      time: Date.now(),
    };
    messages.push(disconnectMessage);
    io.emit('messageRes', disconnectMessage);
  }
};

const handleNewMessage = (data: IMessage, io: Server) => {
  messages.push(data);
  io.emit('messageRes', data);
};

const handleNewUser = (data: { name: string; id: string }, io: Server, socket: Socket) => {
  activeUsers.push(data);
  io.emit('addNewUser', activeUsers);
  const connectMessage = {
    text: `${data.name} присоединился к чату.`,
    name: data.name,
    messageID: `${socket.id}-${Math.random()}`,
    socketID: socket.id,
    time: Date.now(),
  };
  messages.push(connectMessage);
  io.emit('messageRes', connectMessage);
};

const handleLeaveChat = (socket: Socket, socketID: string, io: Server) => {
  const index = activeUsers.findIndex((user) => user.id === socketID);
  const disconnectedUser = activeUsers.find((user) => user.id === socketID);
  if (disconnectedUser) {
    activeUsers.splice(index, 1);
    io.emit('addNewUser', activeUsers);
    const disconnectMessage = {
      text: `${disconnectedUser.name} покинул чат.`,
      name: disconnectedUser.name,
      messageID: disconnectedUser.id,
      socketID: socket.id,
      time: Date.now(),
    };
    messages.push(disconnectMessage);
    io.emit('messageRes', disconnectMessage);
  }
};
