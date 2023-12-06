import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes';
import { io, Socket } from 'socket.io-client';
import { SocketProvider } from './Context/SocketContext';

const socket: Socket = io('http://localhost:5000');

function App() {
  return (
    <SocketProvider socket={socket}>
      <RouterProvider router={routes} />
    </SocketProvider>
  );
}

export default App;
