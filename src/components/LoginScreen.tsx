
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background particle-bg flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-md p-8 glass-effect neumorphic animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
            MineLauncher
          </h1>
          <p className="text-muted-foreground">Premium Minecraft Experience</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-muted/50 border-border/50 focus:border-primary transition-all duration-300 hover:bg-muted/70"
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-muted/50 border-border/50 focus:border-primary transition-all duration-300 hover:bg-muted/70"
              placeholder="Enter your password"
            />
          </div>

          <Button
            onClick={handleLogin}
            disabled={isLoading || !username || !password}
            className="w-full bg-gradient-to-r from-primary via-blue-500 to-purple-500 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-3"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Connecting...</span>
              </div>
            ) : (
              'Launch Game'
            )}
          </Button>

          <div className="text-center">
            <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
              Forgot your password?
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginScreen;
