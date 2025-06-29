
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const NewsPanel: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      title: "Minecraft 1.21 - The Tricky Trials Update",
      summary: "Explore new trial chambers, face challenging mobs, and discover unique rewards in the latest update.",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=200&fit=crop",
      date: "2024-06-25",
      category: "Update",
      featured: true
    },
    {
      id: 2,
      title: "New Mods Available in Launcher",
      summary: "OptiFine HD, JEI, and 15 other popular mods are now available for one-click installation.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=200&fit=crop",
      date: "2024-06-20",
      category: "Mods"
    },
    {
      id: 3,
      title: "Performance Improvements",
      summary: "Our latest launcher update includes significant performance optimizations and bug fixes.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop",
      date: "2024-06-18",
      category: "Launcher"
    },
    {
      id: 4,
      title: "Community Server Spotlight",
      summary: "Discover amazing community servers with custom game modes, mini-games, and unique experiences.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=200&fit=crop",
      date: "2024-06-15",
      category: "Community"
    },
    {
      id: 5,
      title: "Shader Pack Integration",
      summary: "Popular shader packs are now integrated directly into the launcher for easy installation and management.",
      image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=400&h=200&fit=crop",
      date: "2024-06-12",
      category: "Enhancement"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Update': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Mods': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Launcher': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Community': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Enhancement': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Latest News</h2>
        <p className="text-muted-foreground">Stay updated with the latest Minecraft and launcher news</p>
      </div>

      <div className="space-y-6">
        {/* Featured Article */}
        {newsItems.filter(item => item.featured).map((item) => (
          <Card key={item.id} className="overflow-hidden glass-effect neumorphic hover-lift group">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Badge className={getCategoryColor(item.category)}>
                    {item.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </div>
          </Card>
        ))}

        {/* Regular Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsItems.filter(item => !item.featured).map((item) => (
            <Card key={item.id} className="overflow-hidden glass-effect neumorphic hover-lift group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Badge className={getCategoryColor(item.category)}>
                    {item.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPanel;
