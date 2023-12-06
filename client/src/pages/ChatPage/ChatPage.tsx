import { Chat } from '../../components/Chat/Chat';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import classes from './ChatPage.module.scss';

const ChatPage = () => {
  return (
    <div className={classes.chatWrapper}>
      <Sidebar />
      <Chat />
    </div>
  );
};

export default ChatPage;
