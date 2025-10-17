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
        <h2 className="text-3xl font-semibold text-text-dark mb-2">Backend Configuration</h2>
        <p className="text-text-gray text-base">Configure and manage connection to FastAPI backend</p>
      </div>

      {/* Connection Status Card */}
      <div className={`rounded-xl shadow-soft p-8 mb-6 border-2 transition-all
        ${connectionStatus === 'connected' ? 'bg-green-50 border-green-500' :
          connectionStatus === 'testing' ? 'bg-orange-50 border-orange-500' :
          'bg-red-50 border-red-500'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center
              ${connectionStatus === 'connected' ? 'bg-green-500' :
                connectionStatus === 'testing' ? 'bg-orange-500 animate-pulse' :
                'bg-red-500'}`}>
              <Server size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-dark mb-1">
                {connectionStatus === 'connected' && 'Backend Connected'}
                {connectionStatus === 'testing' && 'Testing Connection...'}
                {connectionStatus === 'disconnected' && 'Backend Disconnected'}
              </h3>
              <p className="text-text-gray">
                {connectionStatus === 'connected' && 'All systems operational'}
                {connectionStatus === 'testing' && 'Attempting to reach backend server'}
                {connectionStatus === 'disconnected' && 'Unable to reach backend server'}
              </p>
            </div>
          </div>
          <div>
            {connectionStatus === 'connected' && (
              <CheckCircle size={48} className="text-green-600" />
            )}
            {connectionStatus === 'testing' && (
              <RefreshCw size={48} className="text-orange-600 animate-spin" />
            )}
            {connectionStatus === 'disconnected' && (
              <XCircle size={48} className="text-red-600" />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* API Configuration */}
        <div className="bg-white rounded-xl shadow-soft p-6 border border-border-light">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light">
            <h3 className="text-2xl font-semibold text-text-dark flex items-center gap-2">
              <Server size={24} />
              API Configuration
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-text-dark text-sm">Backend API URL</label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="px-3 py-3 border-2 border-border-light rounded-lg text-base transition-all focus:outline-none focus:border-primary-blue focus:bg-primary-light font-mono"
                placeholder="http://localhost:8000"
              />
              <p className="text-sm text-text-gray">Enter the FastAPI backend URL</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-text-dark text-sm">API Version</label>
              <select className="px-3 py-3 border-2 border-border-light rounded-lg text-base transition-all focus:outline-none focus:border-primary-blue focus:bg-primary-light">
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
        <div className="bg-white rounded-xl shadow-soft p-6 border border-border-light">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light">
            <h3 className="text-2xl font-semibold text-text-dark flex items-center gap-2">
              <Zap size={24} />
              MLOps Integration
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-bg-gray rounded-lg">
              <div className="flex items-center gap-3">
                <Database size={24} className="text-primary-blue" />
                <div>
                  <h4 className="font-medium text-text-dark">Model Registry</h4>
                  <p className="text-sm text-text-gray">MLflow Model Management</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
                <AlertCircle size={16} />
                Pending
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-bg-gray rounded-lg">
              <div className="flex items-center gap-3">
                <Activity size={24} className="text-primary-blue" />
                <div>
                  <h4 className="font-medium text-text-dark">Experiment Tracking</h4>
                  <p className="text-sm text-text-gray">Monitor training runs</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
                <AlertCircle size={16} />
                Pending
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-bg-gray rounded-lg">
              <div className="flex items-center gap-3">
                <Zap size={24} className="text-primary-blue" />
                <div>
                  <h4 className="font-medium text-text-dark">Model Deployment</h4>
                  <p className="text-sm text-text-gray">Deploy models to production</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
                <AlertCircle size={16} />
                Pending
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-bg-gray rounded-lg">
              <div className="flex items-center gap-3">
                <Server size={24} className="text-primary-blue" />
                <div>
                  <h4 className="font-medium text-text-dark">API Endpoints</h4>
                  <p className="text-sm text-text-gray">FastAPI backend services</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
                <AlertCircle size={16} />
                Pending
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* API Endpoints Documentation */}
      <div className="bg-white rounded-xl shadow-soft p-6 border border-border-light">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light">
          <h3 className="text-2xl font-semibold text-text-dark">Available API Endpoints</h3>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-light text-primary-blue">
            FastAPI Integration
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-bg-gray rounded-lg hover:bg-primary-light transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">POST</span>
              <code className="text-sm font-mono text-text-dark">/api/v1/predict</code>
            </div>
            <p className="text-sm text-text-gray ml-16">Submit patient data for Alzheimer's prediction</p>
          </div>

          <div className="p-4 bg-bg-gray rounded-lg hover:bg-primary-light transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">GET</span>
              <code className="text-sm font-mono text-text-dark">/api/v1/results/:id</code>
            </div>
            <p className="text-sm text-text-gray ml-16">Retrieve analysis results by patient ID</p>
          </div>

          <div className="p-4 bg-bg-gray rounded-lg hover:bg-primary-light transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">POST</span>
              <code className="text-sm font-mono text-text-dark">/api/v1/upload</code>
            </div>
            <p className="text-sm text-text-gray ml-16">Upload medical imaging files (DICOM, NIfTI)</p>
          </div>

          <div className="p-4 bg-bg-gray rounded-lg hover:bg-primary-light transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">GET</span>
              <code className="text-sm font-mono text-text-dark">/api/v1/models</code>
            </div>
            <p className="text-sm text-text-gray ml-16">List available ML models and their versions</p>
          </div>

          <div className="p-4 bg-bg-gray rounded-lg hover:bg-primary-light transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">GET</span>
              <code className="text-sm font-mono text-text-dark">/api/v1/health</code>
            </div>
            <p className="text-sm text-text-gray ml-16">Check backend health and status</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary-light border-l-4 border-primary-blue rounded">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-primary-blue flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-text-dark mb-1">Implementation Note</h4>
              <p className="text-sm text-text-gray">
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
