import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { handleSocket } from './src/handler/socketHandler';
import routes from './src/routes/routes';

const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

app.use(cors());
app.use(routes);

handleSocket(io);

httpServer.listen(PORT, () => {
  console.log('server start');
});
