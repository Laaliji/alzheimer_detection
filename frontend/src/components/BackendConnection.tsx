import React, { useState } from 'react';
import { Server, CheckCircle, XCircle, RefreshCw, AlertCircle, Zap, Database, Activity } from 'lucide-react';

const BackendConnection: React.FC = () => {
  const [apiUrl, setApiUrl] = useState('http://localhost:8000');
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');

  const testConnection = () => {
    setConnectionStatus('testing');
    // Simulate connection test
    setTimeout(() => {
      setConnectionStatus('disconnected'); // Change to 'connected' when backend is ready
    }, 2000);
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-text-dark dark:text-dark-text mb-2 transition-colors duration-300">Backend Configuration</h2>
        <p className="text-text-gray dark:text-dark-text-secondary text-base transition-colors duration-300">Configure and manage connection to FastAPI backend</p>
      </div>

      {/* Connection Status Card */}
      <div className={`rounded-xl shadow-soft dark:shadow-dark-soft p-8 mb-6 border-2 transition-all
        ${connectionStatus === 'connected' ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-600' :
          connectionStatus === 'testing' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 dark:border-orange-600' :
          'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-600'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center
              ${connectionStatus === 'connected' ? 'bg-green-500' :
                connectionStatus === 'testing' ? 'bg-orange-500 animate-pulse' :
                'bg-red-500'}`}>
              <Server size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-dark dark:text-dark-text mb-1 transition-colors duration-300">
                {connectionStatus === 'connected' && 'Backend Connected'}
                {connectionStatus === 'testing' && 'Testing Connection...'}
                {connectionStatus === 'disconnected' && 'Backend Disconnected'}
              </h3>
              <p className="text-text-gray dark:text-dark-text-secondary transition-colors duration-300">
                {connectionStatus === 'connected' && 'All systems operational'}
                {connectionStatus === 'testing' && 'Attempting to reach backend server'}
                {connectionStatus === 'disconnected' && 'Unable to reach backend server'}
              </p>
            </div>
          </div>
          <div>
            {connectionStatus === 'connected' && (
              <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
            )}
            {connectionStatus === 'testing' && (
              <RefreshCw size={48} className="text-orange-600 dark:text-orange-400 animate-spin" />
            )}
            {connectionStatus === 'disconnected' && (
              <XCircle size={48} className="text-red-600 dark:text-red-400" />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* API Configuration */}
        <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-soft dark:shadow-dark-soft p-6 border border-border-light dark:border-dark-border transition-colors duration-300">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light dark:border-dark-border transition-colors duration-300">
            <h3 className="text-2xl font-semibold text-text-dark dark:text-dark-text flex items-center gap-2 transition-colors duration-300">
              <Server size={24} />
              API Configuration
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-text-dark dark:text-dark-text text-sm transition-colors duration-300">Backend API URL</label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="px-3 py-3 border-2 border-border-light dark:border-dark-border rounded-lg text-base transition-all focus:outline-none focus:border-primary-blue dark:bg-dark-bg-tertiary dark:text-dark-text font-mono"
                placeholder="http://localhost:8000"
              />
              <p className="text-sm text-text-gray dark:text-dark-text-secondary transition-colors duration-300">Enter the FastAPI backend URL</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-text-dark dark:text-dark-text text-sm transition-colors duration-300">API Version</label>
              <select className="px-3 py-3 border-2 border-border-light dark:border-dark-border rounded-lg text-base transition-all focus:outline-none focus:border-primary-blue dark:bg-dark-bg-tertiary dark:text-dark-text">
                <option value="v1">v1 (Current)</option>
                <option value="v2">v2 (Beta)</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={testConnection}
                disabled={connectionStatus === 'testing'}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-blue text-white rounded-lg font-medium transition-all hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw size={20} className={connectionStatus === 'testing' ? 'animate-spin' : ''} />
                Test Connection
              </button>
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary-green text-white rounded-lg font-medium transition-all hover:bg-green-600">
                <CheckCircle size={20} />
                Save Config
              </button>
            </div>
          </div>
        </div>

        {/* MLOps Integration Status */}
        <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-soft dark:shadow-dark-soft p-6 border border-border-light dark:border-dark-border transition-colors duration-300">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light dark:border-dark-border transition-colors duration-300">
            <h3 className="text-2xl font-semibold text-text-dark dark:text-dark-text flex items-center gap-2 transition-colors duration-300">
              <Zap size={24} />
              MLOps Integration
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-bg-gray dark:bg-dark-bg-tertiary rounded-lg transition-colors duration-300">
              <div className="flex items-center gap-3">
                <Database size={24} className="text-primary-blue dark:text-blue-400" />
                <div>
                  <h4 className="font-medium text-text-dark dark:text-dark-text transition-colors duration-300">Model Registry</h4>
                  <p className="text-sm text-text-gray dark:text-dark-text-secondary transition-colors duration-300">MLflow Model Management</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 transition-colors duration-300">
                <AlertCircle size={16} />
                Pending
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-bg-gray dark:bg-dark-bg-tertiary rounded-lg transition-colors duration-300">
              <div className="flex items-center gap-3">
                <Activity size={24} className="text-primary-blue dark:text-blue-400" />
                <div>
                  <h4 className="font-medium text-text-dark dark:text-dark-text transition-colors duration-300">Experiment Tracking</h4>
                  <p className="text-sm text-text-gray dark:text-dark-text-secondary transition-colors duration-300">Monitor training runs</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 transition-colors duration-300">
                <AlertCircle size={16} />
                Pending
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-bg-gray dark:bg-dark-bg-tertiary rounded-lg transition-colors duration-300">
              <div className="flex items-center gap-3">
                <Zap size={24} className="text-primary-blue dark:text-blue-400" />
                <div>
                  <h4 className="font-medium text-text-dark dark:text-dark-text transition-colors duration-300">Model Deployment</h4>
                  <p className="text-sm text-text-gray dark:text-dark-text-secondary transition-colors duration-300">Deploy models to production</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 transition-colors duration-300">
                <AlertCircle size={16} />
                Pending
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-bg-gray dark:bg-dark-bg-tertiary rounded-lg transition-colors duration-300">
              <div className="flex items-center gap-3">
                <Server size={24} className="text-primary-blue dark:text-blue-400" />
                <div>
                  <h4 className="font-medium text-text-dark dark:text-dark-text transition-colors duration-300">API Endpoints</h4>
                  <p className="text-sm text-text-gray dark:text-dark-text-secondary transition-colors duration-300">FastAPI backend services</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 transition-colors duration-300">
                <AlertCircle size={16} />
                Pending
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* API Endpoints Documentation */}
      <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-soft dark:shadow-dark-soft p-6 border border-border-light dark:border-dark-border transition-colors duration-300">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light dark:border-dark-border transition-colors duration-300">
          <h3 className="text-2xl font-semibold text-text-dark dark:text-dark-text transition-colors duration-300">Available API Endpoints</h3>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-light dark:bg-blue-900/30 text-primary-blue dark:text-blue-400 transition-colors duration-300">
            FastAPI Integration
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-bg-gray dark:bg-dark-bg-tertiary rounded-lg hover:bg-primary-light dark:hover:bg-dark-border transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">POST</span>
              <code className="text-sm font-mono text-text-dark dark:text-dark-text transition-colors duration-300">/api/v1/predict</code>
            </div>
            <p className="text-sm text-text-gray dark:text-dark-text-secondary ml-16 transition-colors duration-300">Submit patient data for Alzheimer's prediction</p>
          </div>

          <div className="p-4 bg-bg-gray dark:bg-dark-bg-tertiary rounded-lg hover:bg-primary-light dark:hover:bg-dark-border transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">GET</span>
              <code className="text-sm font-mono text-text-dark dark:text-dark-text transition-colors duration-300">/api/v1/results/:id</code>
            </div>
            <p className="text-sm text-text-gray dark:text-dark-text-secondary ml-16 transition-colors duration-300">Retrieve analysis results by patient ID</p>
          </div>

          <div className="p-4 bg-bg-gray dark:bg-dark-bg-tertiary rounded-lg hover:bg-primary-light dark:hover:bg-dark-border transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">POST</span>
              <code className="text-sm font-mono text-text-dark dark:text-dark-text transition-colors duration-300">/api/v1/upload</code>
            </div>
            <p className="text-sm text-text-gray dark:text-dark-text-secondary ml-16 transition-colors duration-300">Upload medical imaging files (DICOM, NIfTI)</p>
          </div>

          <div className="p-4 bg-bg-gray dark:bg-dark-bg-tertiary rounded-lg hover:bg-primary-light dark:hover:bg-dark-border transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">GET</span>
              <code className="text-sm font-mono text-text-dark dark:text-dark-text transition-colors duration-300">/api/v1/models</code>
            </div>
            <p className="text-sm text-text-gray dark:text-dark-text-secondary ml-16 transition-colors duration-300">List available ML models and their versions</p>
          </div>

          <div className="p-4 bg-bg-gray dark:bg-dark-bg-tertiary rounded-lg hover:bg-primary-light dark:hover:bg-dark-border transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">GET</span>
              <code className="text-sm font-mono text-text-dark dark:text-dark-text transition-colors duration-300">/api/v1/health</code>
            </div>
            <p className="text-sm text-text-gray dark:text-dark-text-secondary ml-16 transition-colors duration-300">Check backend health and status</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary-light dark:bg-blue-900/20 border-l-4 border-primary-blue dark:border-blue-600 rounded transition-colors duration-300">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-primary-blue dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-text-dark dark:text-dark-text mb-1 transition-colors duration-300">Implementation Note</h4>
              <p className="text-sm text-text-gray dark:text-dark-text-secondary transition-colors duration-300">
                These endpoints will be implemented in the FastAPI backend. The frontend is ready to integrate
                with the backend once it's deployed. All API calls will include proper authentication and error handling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendConnection;
