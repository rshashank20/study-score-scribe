import { useState } from 'react';
import PageTitle from '@/components/PageTitle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SettingsScreen = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: true,
    userName: '',
    userEmail: '',
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSwitchChange = (field: string, checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Settings" />
      
      <div className="space-y-6">
        {/* User Profile Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">User Profile</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="userName">Name</Label>
              <Input
                id="userName"
                value={settings.userName}
                onChange={(e) => handleInputChange('userName', e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label htmlFor="userEmail">Email</Label>
              <Input
                id="userEmail"
                type="email"
                value={settings.userEmail}
                onChange={(e) => handleInputChange('userEmail', e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Enable Notifications</Label>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) => handleSwitchChange('notifications', checked)}
            />
          </div>
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsScreen;
