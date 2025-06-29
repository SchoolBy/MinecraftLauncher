
import React, { useState, useEffect } from 'react';
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
    darkMode: true,
    animations: true,
    particles: true,
    backgroundBlur: true,
    glowEffects: true,
    animationSpeed: [1],
    particleDensity: [12],
    blurIntensity: [10],
    theme: 'purple',
    fontSize: [16],
    borderRadius: [12]
  });

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('launcher_settings');
    if (savedSettings) {
      setSettings({ ...settings, ...JSON.parse(savedSettings) });
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('launcher_settings', JSON.stringify(settings));
    applySettings();
  }, [settings]);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const applySettings = () => {
    const root = document.documentElement;
    
    // Apply theme colors
    switch (settings.theme) {
      case 'blue':
        root.style.setProperty('--primary', '217 91% 60%');
        break;
      case 'green':
        root.style.setProperty('--primary', '142 76% 36%');
        break;
      case 'red':
        root.style.setProperty('--primary', '0 84% 60%');
        break;
      case 'orange':
        root.style.setProperty('--primary', '25 95% 53%');
        break;
      default: // purple
        root.style.setProperty('--primary', '258 90% 66%');
    }

    // Apply font size
    root.style.setProperty('--font-size', `${settings.fontSize[0]}px`);
    
    // Apply border radius
    root.style.setProperty('--radius', `${settings.borderRadius[0]}px`);

    // Apply other visual settings
    if (settings.animations) {
      root.style.setProperty('--animation-duration', `${1 / settings.animationSpeed[0]}s`);
    }
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
            <h2 className="text-xl font-semibold">Appearance Settings</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Theme Settings */}
            <Card className="p-4 glass-effect">
              <h3 className="font-semibold mb-4 text-primary">Theme</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Color Theme</label>
                  <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                    <SelectTrigger className="bg-muted/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Dark Mode</label>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => updateSetting('darkMode', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Font Size</label>
                    <span className="text-sm text-muted-foreground">{settings.fontSize[0]}px</span>
                  </div>
                  <Slider
                    value={settings.fontSize}
                    onValueChange={(value) => updateSetting('fontSize', value)}
                    max={24}
                    min={12}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Border Radius</label>
                    <span className="text-sm text-muted-foreground">{settings.borderRadius[0]}px</span>
                  </div>
                  <Slider
                    value={settings.borderRadius}
                    onValueChange={(value) => updateSetting('borderRadius', value)}
                    max={24}
                    min={0}
                    step={2}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>

            {/* Visual Effects */}
            <Card className="p-4 glass-effect">
              <h3 className="font-semibold mb-4 text-primary">Visual Effects</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Animations</label>
                  <Switch
                    checked={settings.animations}
                    onCheckedChange={(checked) => updateSetting('animations', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Background Particles</label>
                  <Switch
                    checked={settings.particles}
                    onCheckedChange={(checked) => updateSetting('particles', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Glow Effects</label>
                  <Switch
                    checked={settings.glowEffects}
                    onCheckedChange={(checked) => updateSetting('glowEffects', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Background Blur</label>
                  <Switch
                    checked={settings.backgroundBlur}
                    onCheckedChange={(checked) => updateSetting('backgroundBlur', checked)}
                  />
                </div>

                {settings.animations && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Animation Speed</label>
                      <span className="text-sm text-muted-foreground">{settings.animationSpeed[0]}x</span>
                    </div>
                    <Slider
                      value={settings.animationSpeed}
                      onValueChange={(value) => updateSetting('animationSpeed', value)}
                      max={3}
                      min={0.5}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                )}

                {settings.particles && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Particle Density</label>
                      <span className="text-sm text-muted-foreground">{settings.particleDensity[0]}</span>
                    </div>
                    <Slider
                      value={settings.particleDensity}
                      onValueChange={(value) => updateSetting('particleDensity', value)}
                      max={30}
                      min={5}
                      step={1}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </Card>

            {/* Reset Settings */}
            <Card className="p-4 glass-effect">
              <h3 className="font-semibold mb-4 text-primary">Reset</h3>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={() => {
                  localStorage.removeItem('launcher_settings');
                  window.location.reload();
                }}
              >
                Reset to Defaults
              </Button>
            </Card>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border/50">
            <Button onClick={onClose} className="w-full">
              Apply Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
