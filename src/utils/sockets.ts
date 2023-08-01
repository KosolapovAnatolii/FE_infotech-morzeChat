import { io, Socket } from 'socket.io-client';
import { Message } from '../Types/Message';
import { User } from '../Types/Usser';

const socket: Socket = io('http://localhost:5500');
  
export const setupMessageListener = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  socket.on('message', (message: Message) => {
    setMessages((prevMessages) => {
      const messageExists = prevMessages.some((prevMessage) => prevMessage.time === message.time);

      if(!messageExists) {
        return [...prevMessages, message];
      } else {
        return prevMessages;
      }
    });
  });
};

export const setupUserListener = (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) => {
  socket.on('user', (user: User) => {
    setUsers((prevUsers) => {
      const userExists = prevUsers.some((prevUser) => prevUser.name === user.name);
      
      if (!userExists) {
        return [...prevUsers, user];
      } else {
        return prevUsers;
      }
    });
  });
};

export const sendMessage = (message: Message) => {
  socket.emit('sendMessage', message);
};

export const addUser = (user: User) => {
  socket.emit('addUser', user);
};