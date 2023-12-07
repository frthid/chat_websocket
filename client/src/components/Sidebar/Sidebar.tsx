import { useState, useEffect } from 'react';
import { useSocket } from '../../Context/SocketContext';
import Button from '../UI/Button/Button';
import classes from './Sidebar.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHook';
import { removeUser } from '../../store/features/userSlice';
import { FaRegUserCircle } from 'react-icons/fa';


interface Users {
  name: string;
  socketID: string;
}

export const Sidebar = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const [users, setUsers] = useState<Users[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('addNewUser', (data) => {
      setUsers(data);
    });
    return () => {
      socket.off('addNewUser');
    };
  }, [socket, dispatch]);

  const handleLeave = () => {
    localStorage.removeItem('user');
    dispatch(removeUser());
    socket.emit('leaveChat', socket.id);
    navigate('/');
  };

  return (
    <div className={classes.sidebar}>
      <h3 className={classes.sidebar__header}>Пользователи</h3>
      <ul className={classes.sidebar__users}>
        {users && users.map((user) => (
          <li key={`${socket.id}-${Math.random()}`}>
            <FaRegUserCircle className={classes.icon}/>
            <p>{user.name}</p>
          </li>
        ))}
      </ul>
      <Button onClick={handleLeave} variant='message'>
        Выйти
      </Button>
    </div>
  );
};
