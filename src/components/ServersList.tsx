
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Copy, Users } from 'lucide-react';

const ServersList: React.FC = () => {
  const [customIP, setCustomIP] = useState('');
  const [selectedServer, setSelectedServer] = useState('');

  const servers = [
    {
      id: 1,
      name: "EaglerCraft Official",
      ip: "servers.eaglercraft.com",
      description: "Official EaglerCraft server with multiple game modes",
      players: "124/200",
      version: "1.20.4",
      type: "Survival"
    },
    {
      id: 2,
      name: "Creative World",
      ip: "creative.eaglercraft.com",
      description: "Build anything you can imagine in creative mode",
      players: "89/150",
      version: "1.20.4",
      type: "Creative"
    },
    {
      id: 3,
      name: "PvP Arena",
      ip: "pvp.eaglercraft.com",
      description: "Competitive PvP battles and tournaments",
      players: "156/300",
      version: "1.19.4",
      type: "PvP"
    },
    {
      id: 4,
      name: "Skyblock Adventures",
      ip: "skyblock.eaglercraft.com",
      description: "Start with nothing and build your island empire",
      players: "67/100",
      version: "1.20.2",
      type: "Skyblock"
    }
  ];

  const handleConnectToServer = (ip: string) => {
    setSelectedServer(ip);
  };

  const handleCopyIP = (ip: string) => {
    navigator.clipboard.writeText(ip);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Survival': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Creative': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'PvP': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Skyblock': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Server List</h2>
        <p className="text-muted-foreground">Connect to multiplayer servers and play with friends</p>
      </div>

      {/* Custom Server Input */}
      <Card className="p-6 glass-effect neumorphic mb-8">
        <h3 className="text-lg font-semibold mb-4">Connect to Custom Server</h3>
        <div className="flex space-x-4">
          <Input
            placeholder="Enter server IP address"
            value={customIP}
            onChange={(e) => setCustomIP(e.target.value)}
            className="bg-muted/50 border-border/50 focus:border-primary"
          />
          <Button
            onClick={() => handleConnectToServer(customIP)}
            disabled={!customIP.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Connect
          </Button>
        </div>
      </Card>

      {/* Server List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {servers.map((server) => (
          <Card key={server.id} className="p-6 glass-effect neumorphic hover-lift group">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {server.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{server.description}</p>
                </div>
                <Badge className={getTypeColor(server.type)}>
                  {server.type}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{server.players}</span>
                  </div>
                  <span>v{server.version}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg">
                <code className="flex-1 text-sm">{server.ip}</code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopyIP(server.ip)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <Button
                onClick={() => handleConnectToServer(server.ip)}
                className="w-full bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Connect to Server
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Server Connection Frame */}
      {selectedServer && (
        <Card className="p-4 glass-effect neumorphic">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Connected to: {selectedServer}</h3>
            <Button
              variant="outline"
              onClick={() => setSelectedServer('')}
            >
              Disconnect
            </Button>
          </div>
          <div className="relative">
            <iframe
              src={`https://servers.eaglercraft.com/?ip=${selectedServer}`}
              className="w-full h-96 rounded-lg border border-border/50"
              title="Minecraft Server"
              allow="fullscreen"
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default ServersList;
