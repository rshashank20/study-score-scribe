
import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-6 slide-in">
      <h1 className="text-2xl font-bold text-app-blue">{title}</h1>
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
    </div>
  );
};

export default PageTitle;
