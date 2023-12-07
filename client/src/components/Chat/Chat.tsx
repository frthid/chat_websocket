import { ChangeEvent, useState, useEffect } from 'react';
import Form from '../UI/Form/Form';
import classes from './Chat.module.scss';
import { useSocket } from '../../Context/SocketContext';
import Message from '../Message/Message';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

interface IMessage {
  text: string;
  name: string;
  messageID: string;
  socketID: string;
  time: number;
}

export const Chat = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [sort, setSort] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    socket.on('messageRes', (data) => setMessages((prevMessages) => [...prevMessages, data]));

    return () => {
      socket.off('messageRes', (data) => setMessages((prevMessages) => [...prevMessages, data]));
    };
  }, [socket]);

  useEffect(() => {
    setMessages((prevMessages) => {
      return sort
        ? [...prevMessages].sort((a, b) => b.time - a.time)
        : [...prevMessages].sort((a, b) => a.time - b.time);
    });
  }, [sort]);

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
        time: Date.now(),
      });
    }
    setMessage('');
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className={classes.chat}>
      <Message messages={messages} />
      <div className={classes.chat__send}>
        {!sort ? (
          <TiArrowSortedDown onClick={handleSort} className={classes.chat__send__sort} />
        ) : (
          <TiArrowSortedUp onClick={handleSort} className={classes.chat__send__sort}/>
        )}

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
