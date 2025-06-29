
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    autoLaunch: false,
    fullscreen: true,
    vsync: true,
    showFPS: false,
    renderDistance: [12],
    maxFPS: [60],
    memory: [4],
    resolution: '1920x1080'
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Panel */}
      <div className="relative ml-auto w-96 bg-card border-l border-border/50 animate-slide-in-right">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <h2 className="text-xl font-semibold">Settings</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Game Settings */}
            <Card className="p-4 glass-effect">
              <h3 className="font-semibold mb-4 text-primary">Game Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Auto Launch</label>
                  <Switch
                    checked={settings.autoLaunch}
                    onCheckedChange={(checked) => updateSetting('autoLaunch', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Fullscreen</label>
                  <Switch
                    checked={settings.fullscreen}
                    onCheckedChange={(checked) => updateSetting('fullscreen', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Resolution</label>
                  <Select value={settings.resolution} onValueChange={(value) => updateSetting('resolution', value)}>
                    <SelectTrigger className="bg-muted/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1920x1080">1920x1080</SelectItem>
                      <SelectItem value="2560x1440">2560x1440</SelectItem>
                      <SelectItem value="3840x2160">3840x2160</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Performance Settings */}
            <Card className="p-4 glass-effect">
              <h3 className="font-semibold mb-4 text-primary">Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">V-Sync</label>
                  <Switch
                    checked={settings.vsync}
                    onCheckedChange={(checked) => updateSetting('vsync', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Show FPS</label>
                  <Switch
                    checked={settings.showFPS}
                    onCheckedChange={(checked) => updateSetting('showFPS', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Render Distance</label>
                    <span className="text-sm text-muted-foreground">{settings.renderDistance[0]} chunks</span>
                  </div>
                  <Slider
                    value={settings.renderDistance}
                    onValueChange={(value) => updateSetting('renderDistance', value)}
                    max={32}
                    min={2}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Max FPS</label>
                    <span className="text-sm text-muted-foreground">{settings.maxFPS[0]} fps</span>
                  </div>
                  <Slider
                    value={settings.maxFPS}
                    onValueChange={(value) => updateSetting('maxFPS', value)}
                    max={240}
                    min={30}
                    step={10}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Allocated Memory</label>
                    <span className="text-sm text-muted-foreground">{settings.memory[0]} GB</span>
                  </div>
                  <Slider
                    value={settings.memory}
                    onValueChange={(value) => updateSetting('memory', value)}
                    max={16}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>

            {/* Account */}
            <Card className="p-4 glass-effect">
              <h3 className="font-semibold mb-4 text-primary">Account</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Change Skin
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Manage Account
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  Sign Out
                </Button>
              </div>
            </Card>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border/50">
            <Button onClick={onClose} className="w-full">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
