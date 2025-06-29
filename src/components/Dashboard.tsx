
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, Play } from 'lucide-react';
import SettingsPanel from './SettingsPanel';
import NewsPanel from './NewsPanel';
import ModsMenu from './ModsMenu';
import LoadingScreen from './LoadingScreen';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'news' | 'mods'>('home');
  const [showSettings, setShowSettings] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState('1.20.4');

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
    }, 3000);
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
                { id: 'news', label: 'News' },
                { id: 'mods', label: 'Mods' }
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
              <AvatarImage src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=100&h=100&fit=crop&crop=face" />
              <AvatarFallback>ST</AvatarFallback>
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
                  <Avatar className="w-24 h-24 mx-auto border-4 border-primary/30">
                    <AvatarImage src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=200&h=200&fit=crop&crop=face" />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">Steve_Miner</h3>
                    <p className="text-muted-foreground">Premium Player</p>
                  </div>
                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between text-sm">
                      <span>Playtime</span>
                      <span className="text-primary">127h 42m</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Played</span>
                      <span className="text-muted-foreground">2 hours ago</span>
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

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                { label: 'Servers Online', value: '1,247', color: 'text-green-500' },
                { label: 'Players Active', value: '28,431', color: 'text-blue-500' },
                { label: 'Mods Installed', value: '23', color: 'text-purple-500' }
              ].map((stat, index) => (
                <Card key={index} className="p-6 glass-effect neumorphic hover-lift">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'news' && <NewsPanel />}
        {activeTab === 'mods' && <ModsMenu />}
      </main>

      {/* Settings Sidebar */}
      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
};

export default Dashboard;
