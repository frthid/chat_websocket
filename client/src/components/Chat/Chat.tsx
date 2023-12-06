import { ChangeEvent, useState, useEffect } from 'react';
import Form from '../UI/Form/Form';
import classes from './Chat.module.scss';
import { useSocket } from '../../Context/SocketContext';
import Message from '../Message/Message';

interface IMessage {
  text: string;
  name: string;
  messageID: string;
  socketID: string;
}

export const Chat = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on('messageRes', (data) => {
      setMessages([...messages, data]);
    });
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
      <Message messages={messages} />
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
