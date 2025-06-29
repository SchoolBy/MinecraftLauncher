
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Download, Calendar, HardDrive } from 'lucide-react';

const DownloadsPanel: React.FC = () => {
  const [downloads, setDownloads] = useState<{ [key: string]: number }>({});

  const versions = [
    {
      id: '1.20.4',
      name: 'Minecraft 1.20.4',
      type: 'Release',
      date: '2023-12-07',
      size: '47.2 MB',
      description: 'Latest stable release with bug fixes and improvements',
      downloadUrl: '#'
    },
    {
      id: '1.20.2',
      name: 'Minecraft 1.20.2',
      type: 'Release',
      date: '2023-09-21',
      size: '46.8 MB',
      description: 'Stable release with performance improvements',
      downloadUrl: '#'
    },
    {
      id: '1.19.4',
      name: 'Minecraft 1.19.4',
      type: 'Release',
      date: '2023-03-14',
      size: '45.3 MB',
      description: 'The Wild Update with new biomes and features',
      downloadUrl: '#'
    },
    {
      id: '1.18.2',
      name: 'Minecraft 1.18.2',
      type: 'Release',
      date: '2022-02-28',
      size: '44.1 MB',
      description: 'Caves & Cliffs update with world generation changes',
      downloadUrl: '#'
    },
    {
      id: '1.17.1',
      name: 'Minecraft 1.17.1',
      type: 'Release',
      date: '2021-07-06',
      size: '42.7 MB',
      description: 'Caves & Cliffs Part I with new blocks and mobs',
      downloadUrl: '#'
    },
    {
      id: '1.16.5',
      name: 'Minecraft 1.16.5',
      type: 'Release',
      date: '2021-01-15',
      size: '41.9 MB',
      description: 'Nether Update with new dimension content',
      downloadUrl: '#'
    }
  ];

  const handleDownload = (versionId: string, url: string, filename: string) => {
    // Simulate download progress
    setDownloads(prev => ({ ...prev, [versionId]: 0 }));
    
    const interval = setInterval(() => {
      setDownloads(prev => {
        const currentProgress = prev[versionId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          // Simulate actual download
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Remove from downloads after completion
          setTimeout(() => {
            setDownloads(prev => {
              const newDownloads = { ...prev };
              delete newDownloads[versionId];
              return newDownloads;
            });
          }, 2000);
          
          return prev;
        }
        return { ...prev, [versionId]: currentProgress + Math.random() * 15 };
      });
    }, 100);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Release': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Snapshot': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Beta': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Downloads</h2>
        <p className="text-muted-foreground">Download Minecraft versions to play offline</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {versions.map((version) => (
          <Card key={version.id} className="p-6 glass-effect neumorphic hover-lift group">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {version.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{version.description}</p>
                </div>
                <Badge className={getTypeColor(version.type)}>
                  {version.type}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{version.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <HardDrive className="w-4 h-4" />
                    <span>{version.size}</span>
                  </div>
                </div>
              </div>

              {downloads[version.id] !== undefined ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Downloading...</span>
                    <span>{Math.round(downloads[version.id])}%</span>
                  </div>
                  <Progress value={downloads[version.id]} className="h-2" />
                </div>
              ) : (
                <Button
                  onClick={() => handleDownload(version.id, version.downloadUrl, `minecraft-${version.id}.jar`)}
                  className="w-full bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download {version.id}
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DownloadsPanel;
