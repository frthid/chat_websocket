import {  useEffect, useState } from 'react';
import { useSocket } from '../../Context/SocketContext';
import Button from '../UI/Button/Button';
import classes from './Sidebar.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHook';
import { removeUser } from '../../store/features/userSlice';
import { FaRegUserCircle } from 'react-icons/fa';
import { removeUsers } from '../../store/features/usersSlice';
import { User } from '../../model/types';

export const Sidebar = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const socket = useSocket();

  const dispatch = useAppDispatch();
  console.log('do', users)

  useEffect(() => {
    socket.on('addNewUser', (data) => {
      setUsers(data);
      console.log('posle', users)
    });
    return () => {
      socket.off('addNewUser');
    };
  }, [socket, dispatch, users]);

  const handleLeave = () => {
    localStorage.removeItem('user');
    dispatch(removeUser());
    dispatch(removeUsers(socket.id));
    socket.emit('leaveChat', socket.id);
    navigate('/');
  };

  return (
    <div className={classes.sidebar}>
      <h3 className={classes.sidebar__header}>Пользователи</h3>
      <ul className={classes.sidebar__users}>
        {users &&
          users.map((user) => (
            <li key={`${socket.id}-${Math.random()}`}>
              <FaRegUserCircle className={classes.icon} />
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
