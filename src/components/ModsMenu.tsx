
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

const ModsMenu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [installedMods, setInstalledMods] = useState<Set<number>>(new Set([1, 3, 5]));

  const categories = [
    { id: 'all', label: 'All Mods' },
    { id: 'performance', label: 'Performance' },
    { id: 'visual', label: 'Visual' },
    { id: 'utility', label: 'Utility' },
    { id: 'gameplay', label: 'Gameplay' }
  ];

  const mods = [
    {
      id: 1,
      name: "OptiFine HD",
      description: "Dramatically improves game performance and adds advanced graphics settings",
      category: "performance",
      version: "1.20.4",
      downloads: "50M+",
      rating: 4.9,
      installed: true
    },
    {
      id: 2,
      name: "JEI (Just Enough Items)",
      description: "Item and recipe viewing mod for Minecraft",
      category: "utility",
      version: "1.20.4",
      downloads: "25M+",
      rating: 4.8,
      installed: false
    },
    {
      id: 3,
      name: "SEUS Shaders",
      description: "Beautiful realistic shaders that transform the visual experience",
      category: "visual",
      version: "1.20.4",
      downloads: "15M+",
      rating: 4.7,
      installed: true
    },
    {
      id: 4,
      name: "Biomes O' Plenty",
      description: "Adds over 75 new biomes and blocks to explore",
      category: "gameplay",
      version: "1.20.4",
      downloads: "20M+",
      rating: 4.6,
      installed: false
    },
    {
      id: 5,
      name: "Waila (What Am I Looking At)",
      description: "Shows information about blocks and entities you're looking at",
      category: "utility",
      version: "1.20.4",
      downloads: "18M+",
      rating: 4.5,
      installed: true
    },
    {
      id: 6,
      name: "Iron Chests",
      description: "Adds new chest types with larger storage capacity",
      category: "utility",
      version: "1.20.4",
      downloads: "12M+",
      rating: 4.4,
      installed: false
    }
  ];

  const filteredMods = mods.filter(mod => {
    const matchesSearch = mod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mod.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || mod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleMod = (modId: number) => {
    setInstalledMods(prev => {
      const newSet = new Set(prev);
      if (newSet.has(modId)) {
        newSet.delete(modId);
      } else {
        newSet.add(modId);
      }
      return newSet;
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'visual': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'utility': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'gameplay': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Mods Library</h2>
        <p className="text-muted-foreground">Enhance your Minecraft experience with popular mods</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search mods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted/50 border-border/50 focus:border-primary"
          />
        </div>
        
        <div className="flex space-x-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-primary" : ""}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Mods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMods.map((mod) => (
          <Card key={mod.id} className="p-6 glass-effect neumorphic hover-lift group">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {mod.name}
                  </h3>
                  <Badge className={getCategoryColor(mod.category)}>
                    {mod.category}
                  </Badge>
                </div>
                <Switch
                  checked={installedMods.has(mod.id)}
                  onCheckedChange={() => toggleMod(mod.id)}
                />
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {mod.description}
              </p>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>v{mod.version}</span>
                <span>{mod.downloads} downloads</span>
                <div className="flex items-center space-x-1">
                  <span>★</span>
                  <span>{mod.rating}</span>
                </div>
              </div>

              <Button
                variant={installedMods.has(mod.id) ? "destructive" : "default"}
                className="w-full"
                onClick={() => toggleMod(mod.id)}
              >
                {installedMods.has(mod.id) ? "Uninstall" : "Install"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredMods.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No mods found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default ModsMenu;
