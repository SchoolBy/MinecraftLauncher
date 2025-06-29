
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, Play, Upload } from 'lucide-react';
import SettingsPanel from './SettingsPanel';
import DownloadsPanel from './DownloadsPanel';
import ServersList from './ServersList';
import LoadingScreen from './LoadingScreen';

interface DashboardProps {
  username: string;
}

const Dashboard: React.FC<DashboardProps> = ({ username }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'downloads' | 'servers'>('home');
  const [showSettings, setShowSettings] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState('1.20.4');
  const [playtime, setPlaytime] = useState(0);
  const [profileImage, setProfileImage] = useState<string>('');

  // Track playtime
  useEffect(() => {
    const startTime = Date.now();
    const savedPlaytime = localStorage.getItem(`playtime_${username}`) || '0';
    setPlaytime(parseInt(savedPlaytime));

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const sessionTime = Math.floor((currentTime - startTime) / 1000);
      const totalTime = parseInt(savedPlaytime) + sessionTime;
      setPlaytime(totalTime);
      localStorage.setItem(`playtime_${username}`, totalTime.toString());
    }, 1000);

    return () => clearInterval(interval);
  }, [username]);

  // Load profile image from cache
  useEffect(() => {
    const cachedImage = localStorage.getItem(`profile_${username}`);
    if (cachedImage) {
      setProfileImage(cachedImage);
    }
  }, [username]);

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
      // Launch the HTML file based on selected version
      launchMinecraft(selectedVersion);
    }, 3000);
  };

  const launchMinecraft = (version: string) => {
    // Create and open HTML file based on version
    const htmlContent = generateMinecraftHTML(version);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Open in new window/tab
    const gameWindow = window.open(url, '_blank', 'width=1280,height=720,menubar=no,toolbar=no,location=no,status=no,scrollbars=no');
    
    // Clean up URL after a delay
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const generateMinecraftHTML = (version: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minecraft ${version} - MineLauncher</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #1e1e2e, #2a2a3e);
            color: white;
            font-family: 'Inter', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
        }
        .game-container {
            text-align: center;
            max-width: 800px;
            padding: 2rem;
        }
        .version-title {
            font-size: 3rem;
            font-weight: bold;
            background: linear-gradient(45deg, #4f46e5, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 2rem;
        }
        .game-frame {
            width: 100%;
            height: 500px;
            border: 3px solid #4f46e5;
            border-radius: 12px;
            background: #1a1a2e;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: #888;
        }
        .controls {
            margin-top: 2rem;
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        .control-btn {
            background: linear-gradient(45deg, #4f46e5, #7c3aed);
            border: none;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            transition: transform 0.2s;
        }
        .control-btn:hover {
            transform: scale(1.05);
        }
        .status {
            margin-top: 1rem;
            color: #10b981;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1 class="version-title">Minecraft ${version}</h1>
        <div class="game-frame" id="gameFrame">
            <div>🎮 Minecraft ${version} is running!</div>
        </div>
        <div class="controls">
            <button class="control-btn" onclick="toggleFullscreen()">Fullscreen</button>
            <button class="control-btn" onclick="showSettings()">Settings</button>
            <button class="control-btn" onclick="window.close()">Exit Game</button>
        </div>
        <div class="status">Status: Online | FPS: 60 | Ping: 25ms</div>
    </div>

    <script>
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }

        function showSettings() {
            alert('Game settings would open here!');
        }

        // Simulate game activity
        setInterval(() => {
            const fps = Math.floor(Math.random() * 20) + 50;
            const ping = Math.floor(Math.random() * 30) + 15;
            document.querySelector('.status').textContent = 
                \`Status: Online | FPS: \${fps} | Ping: \${ping}ms\`;
        }, 2000);

        // Add some visual effects
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (confirm('Exit Minecraft ${version}?')) {
                    window.close();
                }
            }
        });
    </script>
</body>
</html>`;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setProfileImage(imageUrl);
        localStorage.setItem(`profile_${username}`, imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatPlaytime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  if (isLaunching) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background particle-bg">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              MineLauncher
            </h1>
            <nav className="flex space-x-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'downloads', label: 'Downloads' },
                { id: 'servers', label: 'Servers' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Avatar className="w-10 h-10 border-2 border-primary/30">
              {profileImage ? (
                <AvatarImage src={profileImage} />
              ) : (
                <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
              )}
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(true)}
              className="hover:bg-muted/50 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Player Info */}
              <Card className="lg:col-span-1 p-6 glass-effect neumorphic">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24 mx-auto border-4 border-primary/30">
                      {profileImage ? (
                        <AvatarImage src={profileImage} />
                      ) : (
                        <AvatarFallback className="text-2xl">{username.charAt(0).toUpperCase()}</AvatarFallback>
                      )}
                    </Avatar>
                    <label className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-2 cursor-pointer">
                      <Button size="sm" variant="secondary" className="rounded-full p-2">
                        <Upload className="w-4 h-4" />
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{username}</h3>
                  </div>
                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between text-sm">
                      <span>Playtime</span>
                      <span className="text-primary">{formatPlaytime(playtime)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Status</span>
                      <span className="text-green-500">Online</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Launch Section */}
              <Card className="lg:col-span-2 p-8 glass-effect neumorphic">
                <div className="text-center space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Ready to Play</h2>
                    <p className="text-muted-foreground">Select your version and launch into the world</p>
                  </div>

                  <div className="max-w-xs mx-auto">
                    <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                      <SelectTrigger className="bg-muted/50 border-border/50 hover:bg-muted/70 transition-colors">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border/50">
                        <SelectItem value="1.20.4">Minecraft 1.20.4</SelectItem>
                        <SelectItem value="1.20.2">Minecraft 1.20.2</SelectItem>
                        <SelectItem value="1.19.4">Minecraft 1.19.4</SelectItem>
                        <SelectItem value="1.18.2">Minecraft 1.18.2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleLaunch}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-12 py-6 text-xl font-semibold rounded-xl hover-lift glow-effect animate-pulse-glow"
                  >
                    <Play className="w-6 h-6 mr-3" />
                    LAUNCH GAME
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'downloads' && <DownloadsPanel />}
        {activeTab === 'servers' && <ServersList />}
      </main>

      {/* Settings Sidebar */}
      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
};

export default Dashboard;
