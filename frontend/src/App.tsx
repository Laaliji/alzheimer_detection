import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PatientUpload from './components/PatientUpload';
import ResultsView from './components/ResultsView';
import PipelineMonitor from './components/PipelineMonitor';
import BackendConnection from './components/BackendConnection';

type ViewType = 'dashboard' | 'upload' | 'results' | 'pipeline' | 'backend';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <PatientUpload />;
      case 'results':
        return <ResultsView />;
      case 'pipeline':
        return <PipelineMonitor />;
      case 'backend':
        return <BackendConnection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 p-8 overflow-y-auto bg-bg-gray">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
