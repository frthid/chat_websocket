import { useAppSelector } from '../../hooks/reduxHook';
import classes from './Header.module.scss';

const Header = () => {
  const { name } = useAppSelector((state) => state.user);
  return (
    <header className={classes.header}>
      <h1>SocketChat</h1>
      {name ? <h3>{`Приятного общения, ${name}`}</h3> : <h3>Добро пожаловать!</h3>}
    </header>
  );
};

export default Header;
