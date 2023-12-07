export interface User {
  name: string;
  id: string;
}

export interface IMessage {
  text: string;
  name: string;
  messageID: string;
  socketID: string;
  time: number;
}