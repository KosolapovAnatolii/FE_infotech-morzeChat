import './registerForm.scss';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { User } from '../../Types/Usser';
import { addUser } from '../../utils/sockets';

interface Props {
  setCurrentUser: (data: User) => void;
}

export const RegisterForm: React.FC<Props> = ({ setCurrentUser }) => {
  const [newUser, setNewUser] = useState<User>({
    name: '',
    password: '',
    newby: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevNewUser) => ({ ...prevNewUser, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addUser(newUser);
    setCurrentUser(newUser);
  };

  return (
    <form className='register-form' onSubmit={handleSubmit}>
      <span className='invition'>
        Please, log in
      </span>
      <div>
        <label htmlFor="name">Nickname: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={newUser.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="newby">Newby: </label>
        <input
          type="checkbox"
          id="newby"
          name="newby"
          value="newby"
          checked={newUser.newby}
          onChange={() => setNewUser((prevNewUser) => ({ ...prevNewUser, newby: !prevNewUser.newby }))}
          />
    </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
