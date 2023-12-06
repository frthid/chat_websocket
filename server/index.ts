import express, { Response } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173'
  }
});

app.use(cors());

app.get('/api', (_req, res: Response) => {
  res.json({
    message: "hello"
  });
});

const activeUsers: string[] = [];

io.on('connection', (socket: any) => {
  console.log(`${socket.id} user connected`);

  io.emit('addNewUser', activeUsers);

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
  socket.on('message', (data: string) => {
    console.log(data)
    io.emit('responseMessage', data)
  })

  socket.on('newUser', (data: string) => {
    activeUsers.push(data);
    io.emit('addNewUser', activeUsers);
  });
});

httpServer.listen(PORT, () => {
  console.log('server start');
});
