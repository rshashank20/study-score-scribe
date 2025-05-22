
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calculator, Book } from 'lucide-react';

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="mb-6 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-app-blue flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Calculator size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-app-blue mb-2">SGPA & CGPA Calculator</h1>
        <p className="text-gray-600 max-w-sm mx-auto">
          Track your academic performance with ease. Calculate your semester GPA and cumulative GPA in just a few clicks.
        </p>
      </div>

      <div className="space-y-3 w-full max-w-xs animate-slide-up">
        <Link to="/sgpa">
          <Button className="w-full py-6 text-lg flex items-center gap-2" size="lg">
            <Calculator size={18} /> Get Started
          </Button>
        </Link>
        
        <Link to="/instructions">
          <Button variant="outline" className="w-full py-6 text-lg flex items-center gap-2" size="lg">
            <Book size={18} /> Instructions
          </Button>
        </Link>
      </div>
      
      <p className="text-gray-500 text-sm mt-10 animate-fade-in">
        Version 1.0
      </p>
    </div>
  );
};

export default WelcomeScreen;
