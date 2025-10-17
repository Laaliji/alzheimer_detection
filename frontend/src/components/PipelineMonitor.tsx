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
        <h2 className="text-3xl font-semibold text-text-dark mb-2">ML Pipeline Monitor</h2>
        <p className="text-text-gray text-base">Real-time monitoring of ML pipeline stages and execution</p>
      </div>

      {/* Pipeline Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-soft p-6 border border-border-light">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-text-gray text-sm mb-1">Active Pipelines</div>
              <div className="text-3xl font-bold text-text-dark">3</div>
            </div>
            <PlayCircle size={40} className="text-primary-blue" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 border border-border-light">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-text-gray text-sm mb-1">Completed Today</div>
              <div className="text-3xl font-bold text-text-dark">47</div>
            </div>
            <CheckCircle size={40} className="text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 border border-border-light">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-text-gray text-sm mb-1">Avg Duration</div>
              <div className="text-3xl font-bold text-text-dark">8.2s</div>
            </div>
            <Clock size={40} className="text-accent-teal" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 border border-border-light">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-text-gray text-sm mb-1">Failed</div>
              <div className="text-3xl font-bold text-text-dark">2</div>
            </div>
            <AlertTriangle size={40} className="text-red-500" />
          </div>
        </div>
      </div>

      {/* Current Pipeline Execution */}
      <div className="bg-white rounded-xl shadow-soft p-6 border border-border-light mb-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light">
          <h3 className="text-2xl font-semibold text-text-dark flex items-center gap-2">
            <Activity size={24} />
            Current Pipeline Execution - Patient #1248
          </h3>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-orange-700 rounded-full animate-pulse"></div>
            Running
          </span>
        </div>

        <div className="space-y-4">
          {pipelineStages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <div key={index} className="flex items-center gap-4 p-4 bg-bg-gray rounded-lg">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center
                  ${stage.status === 'completed' ? 'bg-green-100 text-green-700' :
                    stage.status === 'in_progress' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-400'}`}>
                  <Icon size={24} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-text-dark">{stage.name}</h4>
                    <span className="text-sm text-text-gray">{stage.duration}</span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500
                      ${stage.status === 'completed' ? 'w-full bg-green-500' :
                        stage.status === 'in_progress' ? 'w-2/3 bg-orange-500 animate-pulse' :
                        'w-0 bg-gray-400'}`}>
                    </div>
                  </div>
                </div>

                <div>
                  {stage.status === 'completed' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                      <CheckCircle size={16} />
                      Complete
                    </span>
                  )}
                  {stage.status === 'in_progress' && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
                      <div className="w-3 h-3 border-2 border-orange-700 border-t-transparent rounded-full animate-spin" />
                      Running
                    </span>
                  )}
                  {stage.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
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
      <div className="bg-white rounded-xl shadow-soft p-6 border border-border-light">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light">
          <h3 className="text-2xl font-semibold text-text-dark flex items-center gap-2">
            <Clock size={24} />
            Recent Pipeline Executions
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left py-3 px-4 text-text-dark font-semibold">Pipeline ID</th>
                <th className="text-left py-3 px-4 text-text-dark font-semibold">Patient</th>
                <th className="text-left py-3 px-4 text-text-dark font-semibold">Status</th>
                <th className="text-left py-3 px-4 text-text-dark font-semibold">Duration</th>
                <th className="text-left py-3 px-4 text-text-dark font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {recentPipelines.map((pipeline, index) => (
                <tr key={index} className="border-b border-border-light hover:bg-bg-gray transition-colors">
                  <td className="py-3 px-4 text-text-dark font-mono text-sm">{pipeline.id}</td>
                  <td className="py-3 px-4 text-text-dark font-medium">{pipeline.patient}</td>
                  <td className="py-3 px-4">
                    {pipeline.status === 'completed' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                        <CheckCircle size={16} />
                        Completed
                      </span>
                    )}
                    {pipeline.status === 'failed' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                        <AlertTriangle size={16} />
                        Failed
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-text-gray">{pipeline.duration}</td>
                  <td className="py-3 px-4 text-text-gray font-mono text-sm">{pipeline.timestamp}</td>
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
