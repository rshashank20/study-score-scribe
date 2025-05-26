import React from 'react';
import PageTitle from '@/components/PageTitle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SettingsScreen = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };
  
  return (
    <div>
      <PageTitle 
        title="Settings"
        subtitle="Customize your app experience"
      />
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
          <h3 className="font-medium text-gray-800 mb-2">App Preferences</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications" className="text-gray-700">Notifications</Label>
              <p className="text-xs text-gray-500">Receive updates and reminders</p>
            </div>
            <Switch id="notifications" defaultChecked />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
          <h3 className="font-medium text-gray-800 mb-2">Account Information</h3>
          
          <div className="space-y-2">
            <Label htmlFor="user-name">Name</Label>
            <Input id="user-name" placeholder="Enter your name" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="user-email">Email</Label>
            <Input id="user-email" type="email" placeholder="Enter your email" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
          <h3 className="font-medium text-gray-800 mb-2">About</h3>
          
          <div className="text-sm text-gray-600">
            <p className="mb-1">SGPA & CGPA Calculator</p>
            <p className="text-gray-500">Version 1.0.0</p>
          </div>
          
          <div className="pt-2 text-sm">
            <p className="text-gray-500">© 2023 Student Tools</p>
            <a href="#" className="text-app-blue">Privacy Policy</a> •{" "}
            <a href="#" className="text-app-blue">Terms of Service</a>
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
