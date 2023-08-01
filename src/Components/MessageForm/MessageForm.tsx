import React, { ChangeEvent, FormEvent, useState } from 'react';
import './messageForm.scss';
import { formatTime } from '../../utils/formatTime';
import { User } from '../../Types/Usser';
import { Message } from '../../Types/Message';
import { sendMessage } from '../../utils/sockets';

interface Props {
  users: User[];
  currentUser: User;
  selectedUser: string;
  setSelectedUsser: (user: string) => void;
}

export const MessageForm: React.FC<Props> = ({ 
  users,
  currentUser, 
  selectedUser,
  setSelectedUsser 
}) => {
  const [text, setText] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const filteredInput = input.replace(/[^.\- ]/g, '');

    setText(filteredInput);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMessage: Message = {
      time: formatTime(new Date()),
      from: currentUser.name,
      to: selectedUser,
      text,
    };
        
    sendMessage(newMessage);
    
    setText('');
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <select 
        className="select"
        value={selectedUser}
        onChange={(event) => setSelectedUsser(event.target.value)}
      >
        <option 
          value="choose_user"
        >
          Choose user
        </option>
        {users.map(({ name, password }) => (
          <option 
            key={password}
            value={name}
          >
            {name}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="input"
        placeholder="Enter message in Morse code"
        value={text}
        onChange={handleChange}
      />
      <button className="button">Send</button>
    </form>
  );
};
