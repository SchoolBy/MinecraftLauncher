
import React, { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';
import UsernameEntry from '@/components/UsernameEntry';

const Index = () => {
  const [username, setUsername] = useState('');
  const [hasEnteredUsername, setHasEnteredUsername] = useState(false);

  // Load saved username on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('minecraft_username');
    if (savedUsername) {
      setUsername(savedUsername);
      setHasEnteredUsername(true);
    }
  }, []);

  const handleUsernameSubmit = (enteredUsername: string) => {
    setUsername(enteredUsername);
    setHasEnteredUsername(true);
    localStorage.setItem('minecraft_username', enteredUsername);
  };

  const handleLogout = () => {
    localStorage.removeItem('minecraft_username');
    setUsername('');
    setHasEnteredUsername(false);
  };

  return hasEnteredUsername ? (
    <Dashboard username={username} onLogout={handleLogout} />
  ) : (
    <UsernameEntry onUsernameSubmit={handleUsernameSubmit} />
  );
};

export default Index;
