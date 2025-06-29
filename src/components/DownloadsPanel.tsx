
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Package } from 'lucide-react';

const DownloadsPanel: React.FC = () => {
  const downloads = [
    {
      id: 1,
      name: "Minecraft 1.20.4",
      description: "Latest stable release with new features and bug fixes",
      version: "1.20.4",
      size: "125 MB",
      type: "Release",
      downloadUrl: "#",
      featured: true
    },
    {
      id: 2,
      name: "Minecraft 1.20.2",
      description: "Previous stable version with excellent mod support",
      version: "1.20.2",
      size: "123 MB",
      type: "Release",
      downloadUrl: "#"
    },
    {
      id: 3,
      name: "Minecraft 1.19.4",
      description: "Popular version for multiplayer servers",
      version: "1.19.4",
      size: "118 MB",
      type: "Release",
      downloadUrl: "#"
    },
    {
      id: 4,
      name: "Minecraft 1.18.2",
      description: "Stable version with cave and cliffs features",
      version: "1.18.2",
      size: "115 MB",
      type: "Release",
      downloadUrl: "#"
    },
    {
      id: 5,
      name: "OptiFine HD",
      description: "Performance enhancement mod for better graphics",
      version: "1.20.4",
      size: "2.8 MB",
      type: "Mod",
      downloadUrl: "#"
    },
    {
      id: 6,
      name: "Forge Installer",
      description: "Mod loader for Minecraft Java Edition",
      version: "47.2.0",
      size: "1.2 MB",
      type: "Tool",
      downloadUrl: "#"
    }
  ];

  const handleDownload = (item: any) => {
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = item.downloadUrl;
    link.download = `${item.name}-${item.version}.jar`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Release': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Mod': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Tool': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Release': return <Package className="w-4 h-4" />;
      case 'Mod': return <FileText className="w-4 h-4" />;
      case 'Tool': return <Download className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Downloads</h2>
        <p className="text-muted-foreground">Download Minecraft versions and related files</p>
      </div>

      <div className="space-y-6">
        {/* Featured Download */}
        {downloads.filter(item => item.featured).map((item) => (
          <Card key={item.id} className="overflow-hidden glass-effect neumorphic hover-lift group">
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge className={getTypeColor(item.type)}>
                      {getTypeIcon(item.type)}
                      <span className="ml-1">{item.type}</span>
                    </Badge>
                    <span className="text-sm text-muted-foreground">v{item.version}</span>
                    <span className="text-sm text-muted-foreground">{item.size}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <Button
                  onClick={() => handleDownload(item)}
                  className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Regular Downloads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {downloads.filter(item => !item.featured).map((item) => (
            <Card key={item.id} className="overflow-hidden glass-effect neumorphic hover-lift group">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Badge className={getTypeColor(item.type)}>
                    {getTypeIcon(item.type)}
                    <span className="ml-1">{item.type}</span>
                  </Badge>
                  <span className="text-sm text-muted-foreground">v{item.version}</span>
                  <span className="text-sm text-muted-foreground">{item.size}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <Button
                  onClick={() => handleDownload(item)}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DownloadsPanel;
