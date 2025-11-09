import React from 'react';
import { LayoutDashboard, Upload, FileText, Activity, Server } from 'lucide-react';

type ViewType = 'dashboard' | 'upload' | 'results' | 'pipeline' | 'backend';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard' as ViewType, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'upload' as ViewType, icon: Upload, label: 'Patient Upload' },
    { id: 'results' as ViewType, icon: FileText, label: 'AI Results' },
    { id: 'pipeline' as ViewType, icon: Activity, label: 'Pipeline Monitor' },
    { id: 'backend' as ViewType, icon: Server, label: 'Backend Config' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-dark-bg-secondary border-r border-border-light dark:border-dark-border py-6 flex flex-col shadow-soft dark:shadow-dark-soft md:w-64 sm:w-16 transition-colors duration-300">
      <nav className="flex flex-col gap-2 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              className={`flex items-center gap-4 px-5 py-4 rounded-lg font-medium text-base transition-all duration-300 text-left
                ${isActive
                  ? 'bg-primary-blue text-white shadow-soft dark:shadow-dark-soft'
                  : 'bg-transparent text-text-gray dark:text-dark-text-secondary hover:bg-primary-light dark:hover:bg-dark-bg-tertiary hover:text-primary-blue dark:hover:text-white hover:translate-x-1'
                }`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon size={20} />
              <span className="md:inline sm:hidden">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
