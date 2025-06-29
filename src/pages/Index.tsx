
import React, { useState } from 'react';
import LoginScreen from '@/components/LoginScreen';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return isLoggedIn ? <Dashboard /> : <LoginScreen onLogin={handleLogin} />;
};

export default Index;
