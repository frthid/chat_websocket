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

const activeUsers: User[] = [];

io.on('connection', (socket: any) => {
  console.log(`${socket.id} user connected`);

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
    const index = activeUsers.findIndex((user) => user.id);
    if (index !== -1) {
      activeUsers.splice(index, 1);
      io.emit('addNewUser', activeUsers);
    }
    console.log(activeUsers)

  });
  socket.on('message', (data: string) => {
    console.log(data);
    io.emit('responseMessage', data);
  });

  socket.on('newUser', (data: { name: string, id: string }) => {
    activeUsers.push(data);
    io.emit('addNewUser', activeUsers);
    console.log(activeUsers)
  });

  socket.on('leaveChat', (socketID: string) => {
    const index = activeUsers.findIndex((user) => user.id === socketID);
    if (index !== -1) {
      activeUsers.splice(index, 1);
      io.emit('addNewUser', activeUsers);
    }
    console.log(activeUsers)
  });
});

httpServer.listen(PORT, () => {
  console.log('server start');
});
