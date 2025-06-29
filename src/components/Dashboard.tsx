
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Settings, Play, Upload, LogOut } from 'lucide-react';
import SettingsPanel from './SettingsPanel';
import DownloadsPanel from './DownloadsPanel';
import ServersList from './ServersList';
import LoadingScreen from './LoadingScreen';

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ username, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'downloads' | 'servers'>('home');
  const [showSettings, setShowSettings] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState('1.20.4');
  const [playtime, setPlaytime] = useState(0);
  const [profileImage, setProfileImage] = useState<string>('');
  const [lastSessionTime, setLastSessionTime] = useState<string>('');

  // Track playtime and last session
  useEffect(() => {
    const startTime = Date.now();
    const savedPlaytime = localStorage.getItem(`playtime_${username}`) || '0';
    const savedLastSession = localStorage.getItem(`lastSession_${username}`);
    
    setPlaytime(parseInt(savedPlaytime));
    
    if (savedLastSession) {
      const lastSession = new Date(parseInt(savedLastSession));
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - lastSession.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 1) {
        setLastSessionTime('Just now');
      } else if (diffInHours < 24) {
        setLastSessionTime(`${diffInHours}h ago`);
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        setLastSessionTime(`${diffInDays}d ago`);
      }
    } else {
      setLastSessionTime('First time');
    }

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const sessionTime = Math.floor((currentTime - startTime) / 1000);
      const totalTime = parseInt(savedPlaytime) + sessionTime;
      setPlaytime(totalTime);
      localStorage.setItem(`playtime_${username}`, totalTime.toString());
      localStorage.setItem(`lastSession_${username}`, currentTime.toString());
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
    }, 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setProfileImage(imageUrl);
        localStorage.setItem(`profile_${username}`, imageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a PNG file only.');
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
      {/* Fixed positioned particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-particle-float"
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${10 + (i * 11) % 80}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${20 + (i % 5) * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-card/50 backdrop-blur-xl">
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
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-10 h-10 border-2 border-primary/30 cursor-pointer hover:border-primary/50 transition-colors">
                  {profileImage ? (
                    <AvatarImage src={profileImage} />
                  ) : (
                    <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                  )}
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4 glass-effect neumorphic">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16 mx-auto border-4 border-primary/30">
                      {profileImage ? (
                        <AvatarImage src={profileImage} />
                      ) : (
                        <AvatarFallback className="text-xl">{username.charAt(0).toUpperCase()}</AvatarFallback>
                      )}
                    </Avatar>
                    <label className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-2 cursor-pointer">
                      <Button size="sm" variant="secondary" className="rounded-full p-2">
                        <Upload className="w-3 h-3" />
                      </Button>
                      <input
                        type="file"
                        accept=".png"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{username}</h3>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-sm">
                      <span>Playtime</span>
                      <span className="text-primary">{formatPlaytime(playtime)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Session</span>
                      <span className="text-green-500">{lastSessionTime}</span>
                    </div>
                  </div>
                  <Button
                    onClick={onLogout}
                    variant="destructive"
                    size="sm"
                    className="w-full mt-4"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
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
      <main className="relative z-10 container mx-auto px-6 py-8">
        {activeTab === 'home' && (
          <div className="animate-fade-in flex items-center justify-center min-h-[60vh]">
            <Card className="p-8 glass-effect neumorphic max-w-md w-full">
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
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-12 py-6 text-xl font-semibold rounded-xl hover-lift glow-effect"
                >
                  <Play className="w-6 h-6 mr-3" />
                  LAUNCH GAME
                </Button>
              </div>
            </Card>
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
