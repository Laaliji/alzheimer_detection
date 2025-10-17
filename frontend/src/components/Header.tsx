import React from 'react';
import { Activity, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-gradient-to-r from-primary-blue to-accent-teal dark:from-dark-bg-secondary dark:to-dark-bg-tertiary text-white px-8 py-6 flex justify-between items-center shadow-lg relative z-50 transition-colors duration-300">
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
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110"
          aria-label="Toggle dark mode"
        >
          {theme === 'light' ? (
            <Moon size={20} className="transition-transform duration-300" />
          ) : (
            <Sun size={20} className="transition-transform duration-300" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
