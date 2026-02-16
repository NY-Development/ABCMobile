import React from 'react';
import Profile from '../components/Profile';
import { useAuth } from '../context/AuthContext';
import {useProfileModalStore} from '../store/profileModalStore';

const CustomerProfile = () => {
  const { isOpen, setIsOpen } = useProfileModalStore(); // Use Zustand store
  const { user } = useAuth();

  return (
    <div>
      {isOpen && <Profile 
        onClose={() => setIsOpen(false)}
        user={user}
      />}
      <button onClick={() => setIsOpen(true)}>Open Profile</button>
    </div>
  );
}

export default CustomerProfile;