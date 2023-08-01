import React from "react";
import './messageList.scss';
import { FaKey } from 'react-icons/fa';
import { morseDecoder } from '../../utils/morseDecoder';
import { Message } from "../../Types/Message";
import { User } from "../../Types/Usser";

interface Props {
  messages: Message[];
  setMessages: (value: React.SetStateAction<Message[]>) => void;
  currentUser: User;
}

export const MessageList: React.FC<Props> = ({ 
  messages, 
  setMessages, 
  currentUser 
}) => {
  const decodeText = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    message: Message
  ) => {
    event.preventDefault();

    const decodedText = morseDecoder(message.text);

    const updatedMessages = messages.map((msg) =>
      msg.time === message.time ? { ...msg, text: decodedText } : msg
    );

    setMessages(updatedMessages);
  };

  return (
  <section className="message-list">
    {messages.map(message => {
      const { time, from, text } = message;
      return (
      <div key={time} className="message">
        <span className="message__time">{time}</span>
        <span className="message__from">{from}</span>
        <p className="message__text">{text}</p>
        {currentUser.newby && (
          <a 
            href="#" 
            className="message__button"
            onClick={(event) => decodeText(event, message)}
          >
            <FaKey
              size={14} 
              color="grey" 
            />
          </a>
        )}
      </div>
    )})}
  </section>
);
}