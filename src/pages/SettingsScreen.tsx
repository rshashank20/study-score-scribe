import React from 'react';
import PageTitle from '@/components/PageTitle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from 'next-themes';

const SettingsScreen = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <div>
      <PageTitle 
        title="Settings"
        subtitle="Customize your app experience"
      />
      
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-4">
          <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">App Preferences</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dark-mode" className="text-gray-700 dark:text-gray-300">Dark Mode</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Enable dark theme for the app</p>
            </div>
            <Switch 
              id="dark-mode" 
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications" className="text-gray-700 dark:text-gray-300">Notifications</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates and reminders</p>
            </div>
            <Switch id="notifications" defaultChecked />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-4">
          <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Account Information</h3>
          
          <div className="space-y-2">
            <Label htmlFor="user-name" className="text-gray-700 dark:text-gray-300">Name</Label>
            <Input id="user-name" placeholder="Enter your name" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="user-email" className="text-gray-700 dark:text-gray-300">Email</Label>
            <Input id="user-email" type="email" placeholder="Enter your email" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-4">
          <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">About</h3>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-1">SGPA & CGPA Calculator</p>
            <p className="text-gray-500 dark:text-gray-400">Version 1.0.0</p>
          </div>
          
          <div className="pt-2 text-sm">
            <p className="text-gray-500 dark:text-gray-400">© 2023 Student Tools</p>
            <a href="#" className="text-app-blue dark:text-app-light-blue">Privacy Policy</a> •{" "}
            <a href="#" className="text-app-blue dark:text-app-light-blue">Terms of Service</a>
          </div>
        </div>
        
        <Button onClick={handleSave} className="w-full">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsScreen;
