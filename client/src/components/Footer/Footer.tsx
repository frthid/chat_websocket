import { Link } from 'react-router-dom';
import classes from './Footer.module.scss';
import {AiFillGithub} from 'react-icons/ai';
import {BsTelegram} from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p>&copy;&nbsp;2023</p>
      <div className={classes.footer__link}>
        <Link to='https://github.com/frthid'>{<AiFillGithub />}</Link>
        <Link to='https://t.me/eslichoetoi'>{<BsTelegram />}</Link>
      </div>
    </footer>
  )
}
export default Footer