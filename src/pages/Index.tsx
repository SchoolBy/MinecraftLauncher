
import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import UsernameEntry from '@/components/UsernameEntry';

const Index = () => {
  const [username, setUsername] = useState('');
  const [hasEnteredUsername, setHasEnteredUsername] = useState(false);

  const handleUsernameSubmit = (enteredUsername: string) => {
    setUsername(enteredUsername);
    setHasEnteredUsername(true);
  };

  return hasEnteredUsername ? (
    <Dashboard username={username} />
  ) : (
    <UsernameEntry onUsernameSubmit={handleUsernameSubmit} />
  );
};

export default Index;
