import { User } from '../../Types/Usser';
import './currentUser.scss';
import { FaUser } from 'react-icons/fa';

interface Props {
  currentUser: User;
}

export const CurrentUser: React.FC<Props> = ({ currentUser }) => {
  return (
    <div className='current-user'>
      <FaUser 
        size={24} 
        color="grey" 
      />
      <span className='current-user__name'>{currentUser.name}</span>
    </div>
  );
};