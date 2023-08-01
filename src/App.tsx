import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { MessageForm } from './Components/MessageForm';
import { MessageList } from './Components/MessageList';
import { RegisterForm } from './Components/RegisterForm';
import { CurrentUser } from './Components/CurrentUser';
import { User } from './Types/Usser';
import { Message } from './Types/Message';
import { setupMessageListener, setupUserListener } from './utils/sockets';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUsser] = useState('');

  const filterMessagesByUsers = useCallback((messages: Message[]) => (
    messages.filter(({ from, to }) => (
      (from === currentUser?.name && to === selectedUser)
      || (from === selectedUser && to === currentUser?.name)
    ))
  ), [currentUser, selectedUser]);

  const filteredMessages = filterMessagesByUsers(messages);
  
  useEffect(() => {
    setupMessageListener(setMessages);
    setupUserListener(setUsers);
  }, []);

  return (
    <div className="App">
      {currentUser
        ? <>
          <CurrentUser currentUser={currentUser}/>
          <MessageForm 
            users={users}
            currentUser={currentUser} 
            selectedUser={selectedUser}
            setSelectedUsser={setSelectedUsser}
          />
          <MessageList 
            messages={filteredMessages} 
            setMessages={setMessages}
            currentUser={currentUser}
          />
        </>
        : <RegisterForm 
            setCurrentUser={setCurrentUser}
          />
      }
    </div>
  );
}

export default App;
