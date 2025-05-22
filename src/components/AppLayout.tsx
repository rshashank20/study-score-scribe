
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const AppLayout = () => {
  return (
    <div className="app-container relative">
      <div className="py-4">
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
