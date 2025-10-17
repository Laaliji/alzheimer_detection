import React from 'react';
import { Activity, CheckCircle, Clock, AlertTriangle, PlayCircle, Database, Cpu, FileCheck } from 'lucide-react';

const PipelineMonitor: React.FC = () => {
  const pipelineStages = [
    { name: 'Data Ingestion', status: 'completed', duration: '1.2s', icon: Database },
    { name: 'Preprocessing', status: 'completed', duration: '2.8s', icon: Cpu },
    { name: 'Model Inference', status: 'in_progress', duration: '---', icon: Activity },
    { name: 'Post-processing', status: 'pending', duration: '---', icon: FileCheck },
    { name: 'Results Storage', status: 'pending', duration: '---', icon: CheckCircle },
  ];

  const recentPipelines = [
    { id: 'pipeline-001', patient: '#1247', status: 'completed', duration: '8.3s', timestamp: '14:32:15' },
    { id: 'pipeline-002', patient: '#1246', status: 'completed', duration: '7.9s', timestamp: '13:15:42' },
    { id: 'pipeline-003', patient: '#1245', status: 'completed', duration: '9.1s', timestamp: '11:45:28' },
    { id: 'pipeline-004', patient: '#1244', status: 'failed', duration: '3.2s', timestamp: '09:22:10' },
  ];

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-text-dark dark:text-dark-text mb-2 transition-colors duration-300">ML Pipeline Monitor</h2>
        <p className="text-text-gray dark:text-dark-text-secondary text-base transition-colors duration-300">Real-time monitoring of ML pipeline stages and execution</p>
      </div>

      {/* Pipeline Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-soft dark:shadow-dark-soft p-6 border border-border-light dark:border-dark-border transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-text-gray dark:text-dark-text-secondary text-sm mb-1 transition-colors duration-300">Active Pipelines</div>
              <div className="text-3xl font-bold text-text-dark dark:text-dark-text transition-colors duration-300">3</div>
            </div>
            <PlayCircle size={40} className="text-primary-blue dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-soft dark:shadow-dark-soft p-6 border border-border-light dark:border-dark-border transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-text-gray dark:text-dark-text-secondary text-sm mb-1 transition-colors duration-300">Completed Today</div>
              <div className="text-3xl font-bold text-text-dark dark:text-dark-text transition-colors duration-300">47</div>
            </div>
            <CheckCircle size={40} className="text-green-500 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-soft dark:shadow-dark-soft p-6 border border-border-light dark:border-dark-border transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-text-gray dark:text-dark-text-secondary text-sm mb-1 transition-colors duration-300">Avg Duration</div>
              <div className="text-3xl font-bold text-text-dark dark:text-dark-text transition-colors duration-300">8.2s</div>
            </div>
            <Clock size={40} className="text-accent-teal dark:text-cyan-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-soft dark:shadow-dark-soft p-6 border border-border-light dark:border-dark-border transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-text-gray dark:text-dark-text-secondary text-sm mb-1 transition-colors duration-300">Failed</div>
              <div className="text-3xl font-bold text-text-dark dark:text-dark-text transition-colors duration-300">2</div>
            </div>
            <AlertTriangle size={40} className="text-red-500 dark:text-red-400" />
          </div>
        </div>
      </div>

      {/* Current Pipeline Execution */}
      <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-soft dark:shadow-dark-soft p-6 border border-border-light dark:border-dark-border mb-6 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light dark:border-dark-border transition-colors duration-300">
          <h3 className="text-2xl font-semibold text-text-dark dark:text-dark-text flex items-center gap-2 transition-colors duration-300">
            <Activity size={24} />
            Current Pipeline Execution - Patient #1248
          </h3>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-sm font-medium transition-colors duration-300">
            <div className="w-2 h-2 bg-orange-700 dark:bg-orange-400 rounded-full animate-pulse"></div>
            Running
          </span>
        </div>

        <div className="space-y-4">
          {pipelineStages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <div key={index} className="flex items-center gap-4 p-4 bg-bg-gray dark:bg-dark-bg-tertiary rounded-lg transition-colors duration-300">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center
                  ${stage.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                    stage.status === 'in_progress' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' :
                    'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                  <Icon size={24} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-text-dark dark:text-dark-text transition-colors duration-300">{stage.name}</h4>
                    <span className="text-sm text-text-gray dark:text-dark-text-secondary transition-colors duration-300">{stage.duration}</span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-colors duration-300">
                    <div className={`h-full rounded-full transition-all duration-500
                      ${stage.status === 'completed' ? 'w-full bg-green-500' :
                        stage.status === 'in_progress' ? 'w-2/3 bg-orange-500 animate-pulse' :
                        'w-0 bg-gray-400'}`}>
                    </div>
                  </div>
                </div>

                <div>
                  {stage.status === 'completed' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 transition-colors duration-300">
                      <CheckCircle size={16} />
                      Complete
                    </span>
                  )}
                  {stage.status === 'in_progress' && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 transition-colors duration-300">
                      <div className="w-3 h-3 border-2 border-orange-700 dark:border-orange-400 border-t-transparent rounded-full animate-spin" />
                      Running
                    </span>
                  )}
                  {stage.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      <Clock size={16} />
                      Pending
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Pipeline Executions */}
      <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-soft dark:shadow-dark-soft p-6 border border-border-light dark:border-dark-border transition-colors duration-300">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light dark:border-dark-border transition-colors duration-300">
          <h3 className="text-2xl font-semibold text-text-dark dark:text-dark-text flex items-center gap-2 transition-colors duration-300">
            <Clock size={24} />
            Recent Pipeline Executions
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-light dark:border-dark-border transition-colors duration-300">
                <th className="text-left py-3 px-4 text-text-dark dark:text-dark-text font-semibold transition-colors duration-300">Pipeline ID</th>
                <th className="text-left py-3 px-4 text-text-dark dark:text-dark-text font-semibold transition-colors duration-300">Patient</th>
                <th className="text-left py-3 px-4 text-text-dark dark:text-dark-text font-semibold transition-colors duration-300">Status</th>
                <th className="text-left py-3 px-4 text-text-dark dark:text-dark-text font-semibold transition-colors duration-300">Duration</th>
                <th className="text-left py-3 px-4 text-text-dark dark:text-dark-text font-semibold transition-colors duration-300">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {recentPipelines.map((pipeline, index) => (
                <tr key={index} className="border-b border-border-light dark:border-dark-border hover:bg-bg-gray dark:hover:bg-dark-bg-tertiary transition-colors">
                  <td className="py-3 px-4 text-text-dark dark:text-dark-text font-mono text-sm transition-colors duration-300">{pipeline.id}</td>
                  <td className="py-3 px-4 text-text-dark dark:text-dark-text font-medium transition-colors duration-300">{pipeline.patient}</td>
                  <td className="py-3 px-4">
                    {pipeline.status === 'completed' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 transition-colors duration-300">
                        <CheckCircle size={16} />
                        Completed
                      </span>
                    )}
                    {pipeline.status === 'failed' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 transition-colors duration-300">
                        <AlertTriangle size={16} />
                        Failed
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-text-gray dark:text-dark-text-secondary transition-colors duration-300">{pipeline.duration}</td>
                  <td className="py-3 px-4 text-text-gray dark:text-dark-text-secondary font-mono text-sm transition-colors duration-300">{pipeline.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PipelineMonitor;
