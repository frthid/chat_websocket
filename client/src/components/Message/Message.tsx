// import { useEffect, useState } from 'react';
import { useSocket } from '../../Context/SocketContext';
import classes from './Message.module.scss';

interface IMessage {
  text: string;
  name: string;
  messageID: string;
  socketID: string;
}

interface Messages {
  messages: IMessage[];
}

const Message: React.FC<Messages> = ({ messages }) => {
  const socket = useSocket();
  // const [newUserMessage, setNewUserMessage] = useState<string>('');

  // useEffect(() => {
  //   const handleNewUser = (newUserData: { name: string; id: string }) => {
  //     setNewUserMessage(`${newUserData.name} присоединился к чату!`);
  //     // Убрать сообщение через определенное время
  //     // setTimeout(() => {
  //     //   setNewUserMessage('');
  //     // }, 5000); // Измените таймаут по необходимости
  //   };

  //   // Подписываемся на событие при добавлении нового пользователя
  //   socket.on('newUserAdded', handleNewUser);

  //   // Очищаем слушатель события при размонтировании компонента
  //   return () => {
  //     socket.off('newUserAdded', handleNewUser);
  //   };
  // }, [socket]);

  return (
    <div className={classes.area}>
      {/* {newUserMessage && (
        <div key='newUserMessage'>
          <p>Система</p>
          <div>
            <p>{newUserMessage}</p>
          </div>
        </div>
      )} */}

      {messages.map((mes: IMessage) => 
        mes.socketID === socket.id ? (
          <div className={classes.area__message} key={mes.messageID}>
            <p className={classes.area__message__nameSen}>Вы</p>
            <div className={classes.area__message__sender}>
              <p>{mes.text}</p>
            </div>
          </div>
        ) : (
          <div className={classes.area__message} key={mes.messageID}>
            <p className={classes.area__message__nameRes}>{mes.name}</p>
            <div className={classes.area__message__recipiens}>
              <p>{mes.text}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Message;
