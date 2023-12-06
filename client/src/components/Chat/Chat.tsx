import { ChangeEvent, useState, useEffect } from 'react';
import Form from '../UI/Form/Form';
import classes from './Chat.module.scss';
import { useSocket } from '../../Context/SocketContext';

interface Message {
  text: string;
  name: string;
  messageID: string;
  socketID: string;
}

export const Chat = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on('responseMessage', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  const handleMessagetChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localStorage.getItem('user')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('user'),
        messageID: `${socket.id}-${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  return (
    <div className={classes.chat}>
      <div className={classes.chat__area}>
        {messages.map((mes) =>
          mes.socketID === socket.id ? (
            <div className={classes.chat__area__message} key={mes.messageID}>
              <p className={classes.chat__area__message__name}>Вы</p>
              <div className={classes.chat__area__message__sender}>
                <p>{mes.text}</p>
              </div>
            </div>
          ) : (
            <div className={classes.chat__area__message} key={mes.messageID}>
              <p>{mes.name}</p>
              <div className={classes.chat__area__message__recipiens}>
                <p>{mes.text}</p>
              </div>
            </div>
          )
        )}
      </div>
      <div className={classes.chat__send}>
        <Form
          handleInputChange={handleMessagetChange}
          value={message}
          handleSubmit={handleSubmit}
          btnTitle='Отправить'
          variant='message'
          inputVariant='message'
        />
      </div>
    </div>
  );
};
