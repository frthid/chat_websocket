import express, { Response } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

app.use(cors());

app.get('/api', (_req, res: Response) => {
  res.json({
    message: 'hello',
  });
});

interface User {
  name: string;
  id: string;
}

interface IMessage {
  text: string;
  name: string;
  messageID: string;
  socketID: string;
}

const activeUsers: User[] = [];
const messages: IMessage[] = [];

io.on('connection', (socket: any) => {
  console.log(`${socket.id} user connected`);
  io.to(socket.id).emit('addNewUser', activeUsers);
  io.to(socket.id).emit('messages', messages);

  socket.on('disconnect', () => {
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
      };
      messages.push(disconnectMessage);
      io.emit('messageRes', disconnectMessage);
    }
  });

  socket.on('message', (data: IMessage) => {
    messages.push(data);
    console.log(messages);
    io.emit('messageRes', data);
  });

  socket.on('newUser', (data: { name: string; id: string }) => {
    activeUsers.push(data);
    io.emit('addNewUser', activeUsers);
    const connectMessage = {
      text: `${data.name} присоединился к чату.`,
      name: data.name,
      messageID: `${socket.id}-${Math.random()}`,
      socketID: socket.id,
    };
    messages.push(connectMessage);
    io.emit('messageRes', connectMessage);
  });

  socket.on('leaveChat', (socketID: string) => {
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
      };
      messages.push(disconnectMessage);
      io.emit('messageRes', disconnectMessage);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log('server start');
});
