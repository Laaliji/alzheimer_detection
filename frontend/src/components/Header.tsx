import React from 'react';
import { Activity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary-blue to-accent-teal text-white px-8 py-6 flex justify-between items-center shadow-lg relative z-50">
      <div className="flex items-center gap-4">
        <Activity size={32} className="animate-pulse-slow" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AlzheimerAI</h1>
          <p className="text-sm opacity-90 font-light">Advanced Detection Platform</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm">
          <div className="w-2 h-2 bg-secondary-green rounded-full animate-pulse"></div>
          <span>System Active</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
