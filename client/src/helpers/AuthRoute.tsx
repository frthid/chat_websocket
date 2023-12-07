import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHook';
import ChatPage from '../pages/ChatPage/ChatPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import {useEffect} from 'react'

const AuthRoute = () => {
  const navigate = useNavigate();
  const { name } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!name) {
      navigate('/');
    }
  }, [name, navigate]);

  if (!name) {
    return <LoginPage />;
  }

  return <ChatPage />;
};

export default AuthRoute;
