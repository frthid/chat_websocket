import { useSocket } from '../../Context/SocketContext';
import { IMessage } from '../../model/types';
import classes from './Message.module.scss';

interface Messages {
  messages: IMessage[];
}

const Message: React.FC<Messages> = ({ messages }) => {
  const socket = useSocket();

  const formatTime = (time: number): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Intl.DateTimeFormat('ru-RU', options).format(new Date(time));
  };

  return (
    <div className={classes.area}>
      {messages.map((mes: IMessage) =>
        mes.socketID === socket.id ? (
          <div className={classes.area__message} key={mes.messageID}>
            <p className={classes.area__message__nameSen}>Вы</p>
            <div className={classes.area__message__sender}>
              <p>{mes.text}</p>
              <span>{formatTime(mes.time)}</span>
            </div>
          </div>
        ) : (
          <div className={classes.area__message} key={mes.messageID}>
            <p className={classes.area__message__nameRes}>{mes.name}</p>
            <div className={classes.area__message__recipiens}>
              <p>{mes.text}</p>
              <span>{formatTime(mes.time)}</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Message;
