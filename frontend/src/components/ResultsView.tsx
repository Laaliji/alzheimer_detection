import React from 'react';
import { Brain, AlertCircle, CheckCircle, TrendingUp, User } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ResultsView: React.FC = () => {
  // Mock data for charts
  const confidenceData = [
    { name: 'Week 1', accuracy: 82 },
    { name: 'Week 2', accuracy: 85 },
    { name: 'Week 3', accuracy: 87 },
    { name: 'Week 4', accuracy: 89 },
    { name: 'Week 5', accuracy: 89.4 },
  ];

  const classificationData = [
    { name: 'Alzheimer\'s Detected', value: 32, color: '#E74C3C' },
    { name: 'No Detection', value: 185, color: '#27AE60' },
    { name: 'Uncertain', value: 30, color: '#F39C12' },
  ];

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-text-dark mb-2">AI/ML Detection Results</h2>
        <p className="text-text-gray text-base">Analysis results and model predictions</p>
      </div>

      {/* Latest Analysis Result */}
      <div className="bg-gradient-to-br from-primary-blue to-accent-teal text-white rounded-xl shadow-medium p-8 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Brain size={40} />
            <div>
              <h3 className="text-2xl font-bold">Latest Analysis - Patient #1247</h3>
              <p className="text-sm opacity-90">Completed 5 minutes ago</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
            <CheckCircle size={18} />
            Processing Complete
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-sm opacity-90 mb-1">Confidence Score</div>
            <div className="text-3xl font-bold">92.7%</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-sm opacity-90 mb-1">Risk Assessment</div>
            <div className="text-3xl font-bold">Low</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-sm opacity-90 mb-1">Processing Time</div>
            <div className="text-3xl font-bold">3.2s</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Model Confidence Trend */}
        <div className="bg-white rounded-xl shadow-soft p-6 border border-border-light">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light">
            <h3 className="text-2xl font-semibold text-text-dark flex items-center gap-2">
              <TrendingUp size={24} />
              Model Confidence Trend
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={confidenceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E1E8ED" />
              <XAxis dataKey="name" stroke="#7F8C8D" />
              <YAxis stroke="#7F8C8D" domain={[75, 95]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#4A90E2" strokeWidth={3} dot={{ fill: '#4A90E2', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Classification Distribution */}
        <div className="bg-white rounded-xl shadow-soft p-6 border border-border-light">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light">
            <h3 className="text-2xl font-semibold text-text-dark flex items-center gap-2">
              <Brain size={24} />
              Classification Distribution
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={classificationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {classificationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Predictions */}
      <div className="bg-white rounded-xl shadow-soft p-6 border border-border-light">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light">
          <h3 className="text-2xl font-semibold text-text-dark flex items-center gap-2">
            <User size={24} />
            Recent Predictions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left py-3 px-4 text-text-dark font-semibold">Patient ID</th>
                <th className="text-left py-3 px-4 text-text-dark font-semibold">Date</th>
                <th className="text-left py-3 px-4 text-text-dark font-semibold">Prediction</th>
                <th className="text-left py-3 px-4 text-text-dark font-semibold">Confidence</th>
                <th className="text-left py-3 px-4 text-text-dark font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light hover:bg-bg-gray transition-colors">
                <td className="py-3 px-4 text-text-dark font-medium">#1247</td>
                <td className="py-3 px-4 text-text-gray">2025-10-16 14:32</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    <CheckCircle size={16} />
                    No Detection
                  </span>
                </td>
                <td className="py-3 px-4 text-text-dark font-semibold">92.7%</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-light text-primary-blue">Complete</span>
                </td>
              </tr>
              <tr className="border-b border-border-light hover:bg-bg-gray transition-colors">
                <td className="py-3 px-4 text-text-dark font-medium">#1246</td>
                <td className="py-3 px-4 text-text-gray">2025-10-16 13:15</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                    <AlertCircle size={16} />
                    Alzheimer's Detected
                  </span>
                </td>
                <td className="py-3 px-4 text-text-dark font-semibold">88.3%</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-light text-primary-blue">Complete</span>
                </td>
              </tr>
              <tr className="border-b border-border-light hover:bg-bg-gray transition-colors">
                <td className="py-3 px-4 text-text-dark font-medium">#1245</td>
                <td className="py-3 px-4 text-text-gray">2025-10-16 11:45</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    <CheckCircle size={16} />
                    No Detection
                  </span>
                </td>
                <td className="py-3 px-4 text-text-dark font-semibold">94.1%</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-light text-primary-blue">Complete</span>
                </td>
              </tr>
              <tr className="border-b border-border-light hover:bg-bg-gray transition-colors">
                <td className="py-3 px-4 text-text-dark font-medium">#1244</td>
                <td className="py-3 px-4 text-text-gray">2025-10-16 09:22</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
                    <AlertCircle size={16} />
                    Uncertain
                  </span>
                </td>
                <td className="py-3 px-4 text-text-dark font-semibold">67.5%</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">Review Needed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
