
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  const loadingSteps = [
    { text: 'Initializing...', duration: 500 },
    { text: 'Loading game assets...', duration: 800 },
    { text: 'Preparing world...', duration: 600 },
    { text: 'Starting Minecraft...', duration: 700 },
    { text: 'Almost ready...', duration: 500 }
  ];

  useEffect(() => {
    let currentStep = 0;
    let currentProgress = 0;
    
    const updateProgress = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingText(step.text);
        
        const stepProgress = (currentStep + 1) * (100 / loadingSteps.length);
        const increment = (stepProgress - currentProgress) / 20;
        
        const progressInterval = setInterval(() => {
          currentProgress += increment;
          setProgress(Math.min(currentProgress, stepProgress));
          
          if (currentProgress >= stepProgress) {
            clearInterval(progressInterval);
            currentStep++;
            
            setTimeout(() => {
              if (currentStep < loadingSteps.length) {
                updateProgress();
              }
            }, 200);
          }
        }, step.duration / 20);
      }
    };

    updateProgress();
  }, []);

  return (
    <div className="min-h-screen bg-background particle-bg flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${10 + Math.random() * 15}s`
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-8 max-w-md mx-auto animate-fade-in">
        {/* Logo */}
        <div className="animate-float">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            MineLauncher
          </h1>
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-blue-500 rounded-lg animate-pulse-glow" />
        </div>

        {/* Loading Progress */}
        <div className="space-y-4">
          <div className="text-xl font-medium text-foreground">
            {loadingText}
          </div>
          
          <div className="space-y-2">
            <Progress 
              value={progress} 
              className="w-full h-3 bg-muted/30"
            />
            <div className="text-sm text-muted-foreground">
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
