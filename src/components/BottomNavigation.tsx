
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calculator, BookOpen, HelpCircle, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 flex items-center justify-around px-4 shadow-sm z-10">
      <NavItem to="/" icon={<Home size={20} />} label="Home" />
      <NavItem to="/sgpa" icon={<Calculator size={20} />} label="SGPA" />
      <NavItem to="/cgpa" icon={<BookOpen size={20} />} label="CGPA" />
      <NavItem to="/instructions" icon={<HelpCircle size={20} />} label="Help" />
      <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        cn(
          "flex flex-col items-center justify-center",
          "w-16 h-full transition-colors",
          isActive 
            ? "text-app-blue font-medium" 
            : "text-gray-500 hover:text-app-purple"
        )
      }
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs">{label}</span>
    </NavLink>
  );
};

export default BottomNavigation;
