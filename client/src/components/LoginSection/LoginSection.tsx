import Form from '../UI/Form/Form';
import classes from './LoginSection.module.scss';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { useSocket } from '../../Context/SocketContext';
import { useAppDispatch } from '../../hooks/reduxHook';
import { addUser } from '../../store/features/userSlice';
import { addUsers } from '../../store/features/usersSlice';

const LoginSection = () => {
  const [user, setUser] = useState<string>('');
  const navigate = useNavigate();
  const socket = useSocket();
  const dispatch = useAppDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addUser({ name: user, id: socket.id }));
    dispatch(addUsers({ name: user, id: socket.id }));
    localStorage.setItem('user', user);
    socket.emit('newUser', { name: user, id: socket.id });
    navigate('/chat');
  };

  return (
    <div className={classes.login}>
      <Form
        handleInputChange={handleInputChange}
        value={user}
        handleSubmit={handleSubmit}
        title='Вход в чат'
        lblTitle='Введите свое имя'
        btnTitle='Войти'
        variant='submit'
        inputVariant='submit'
      />
    </div>
  );
};

export default LoginSection;
