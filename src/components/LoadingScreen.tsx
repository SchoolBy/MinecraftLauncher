
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, text: 'Loading game files...' },
      { progress: 40, text: 'Preparing world...' },
      { progress: 60, text: 'Starting game engine...' },
      { progress: 80, text: 'Almost ready...' },
      { progress: 100, text: 'Launching Minecraft!' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setProgress(step.progress);
        setLoadingText(step.text);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background particle-bg flex items-center justify-center">
      {/* Smooth animated particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-particle-float"
            style={{
              left: `${5 + (i * 4.5) % 90}%`,
              top: `${5 + (i * 7) % 90}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${15 + (i % 8) * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-8 z-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
            MineLauncher
          </h1>
          <p className="text-muted-foreground text-lg">{loadingText}</p>
        </div>

        <div className="w-80 space-y-2">
          <Progress 
            value={progress} 
            className="h-3 bg-muted/30"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Loading...</span>
            <span>{progress}%</span>
          </div>
        </div>

        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
