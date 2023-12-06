import LoginSection from '../../components/LoginSection/LoginSection';
import classes from './LoginPage.module.scss'

const LoginPage = () => {
  return (
    <div className={classes.login}>
      <LoginSection />
    </div>
  );
};

export default LoginPage;
