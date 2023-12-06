import { useState, useEffect } from 'react';
import { useSocket } from '../../Context/SocketContext';
import Button from '../UI/Button/Button';
import classes from './Sidebar.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHook';
import { removeUser } from '../../store/features/userSlice';

interface Users {
  user: string;
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
  }, [socket]);

  const handleLeave = () => {
    localStorage.removeItem('user');
    dispatch(removeUser());
    navigate('/');
  };

  return (
    <div className={classes.sidebar}>
      <h3 className={classes.sidebar__header}>Пользователи</h3>
      <ul className={classes.sidebar__users}>
        {users.map((user) => (
          <li key={user.socketID}>{user.user}</li>
        ))}
      </ul>
      <Button onClick={handleLeave} variant='message'>
        Выйти
      </Button>
    </div>
  );
};
