import React from 'react';
import { Users, Brain, TrendingUp, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-text-dark mb-2">Dashboard Overview</h2>
        <p className="text-text-gray text-base">Real-time analytics and system status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary-blue to-accent-teal text-white p-6 rounded-xl shadow-medium">
          <Users size={32} />
          <div className="text-4xl font-bold my-2">247</div>
          <div className="text-sm opacity-90">Total Patients Analyzed</div>
        </div>

        <div className="bg-gradient-to-br from-secondary-green to-green-600 text-white p-6 rounded-xl shadow-medium">
          <Brain size={32} />
          <div className="text-4xl font-bold my-2">89.4%</div>
          <div className="text-sm opacity-90">Model Accuracy</div>
        </div>

        <div className="bg-gradient-to-br from-accent-teal to-primary-blue text-white p-6 rounded-xl shadow-medium">
          <TrendingUp size={32} />
          <div className="text-4xl font-bold my-2">24</div>
          <div className="text-sm opacity-90">Analyses This Week</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-soft p-6 border border-border-light">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light">
            <h3 className="text-2xl font-semibold text-text-dark flex items-center gap-2">
              <Clock size={24} />
              Recent Activity
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 p-4 bg-bg-gray rounded-lg transition-all hover:bg-primary-light hover:translate-x-1">
              <div className="w-3 h-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-text-dark mb-1">Patient #1247 analysis completed</p>
                <p className="text-sm text-text-gray">2 minutes ago</p>
              </div>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700">Completed</span>
            </div>

            <div className="flex items-center gap-4 p-4 bg-bg-gray rounded-lg transition-all hover:bg-primary-light hover:translate-x-1">
              <div className="w-3 h-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-text-dark mb-1">Model training in progress</p>
                <p className="text-sm text-text-gray">15 minutes ago</p>
              </div>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-orange-100 text-orange-700">In Progress</span>
            </div>

            <div className="flex items-center gap-4 p-4 bg-bg-gray rounded-lg transition-all hover:bg-primary-light hover:translate-x-1">
              <div className="w-3 h-3">
                <div className="w-3 h-3 bg-primary-blue rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-text-dark mb-1">New data uploaded - 5 patients</p>
                <p className="text-sm text-text-gray">1 hour ago</p>
              </div>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-light text-primary-blue">Uploaded</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 border border-border-light">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light">
            <h3 className="text-2xl font-semibold text-text-dark flex items-center gap-2">
              <Brain size={24} />
              Model Performance
            </h3>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-24 font-medium text-text-dark text-sm">Sensitivity</div>
              <div className="flex-1 h-3 bg-bg-gray rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: '92%' }}></div>
              </div>
              <div className="w-12 text-right font-semibold text-text-dark">92%</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-24 font-medium text-text-dark text-sm">Specificity</div>
              <div className="flex-1 h-3 bg-bg-gray rounded-full overflow-hidden">
                <div className="h-full bg-primary-blue rounded-full transition-all duration-500" style={{ width: '87%' }}></div>
              </div>
              <div className="w-12 text-right font-semibold text-text-dark">87%</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-24 font-medium text-text-dark text-sm">Precision</div>
              <div className="flex-1 h-3 bg-bg-gray rounded-full overflow-hidden">
                <div className="h-full bg-secondary-green rounded-full transition-all duration-500" style={{ width: '89%' }}></div>
              </div>
              <div className="w-12 text-right font-semibold text-text-dark">89%</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-24 font-medium text-text-dark text-sm">F1 Score</div>
              <div className="flex-1 h-3 bg-bg-gray rounded-full overflow-hidden">
                <div className="h-full bg-accent-teal rounded-full transition-all duration-500" style={{ width: '90%' }}></div>
              </div>
              <div className="w-12 text-right font-semibold text-text-dark">90%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-soft p-6 border border-border-light">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light">
          <h3 className="text-2xl font-semibold text-text-dark">Quick Actions</h3>
        </div>
        <div className="flex flex-wrap gap-4">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-blue text-white rounded-lg font-medium transition-all hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-medium">
            <Users size={20} />
            Analyze New Patient
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-secondary-green text-white rounded-lg font-medium transition-all hover:bg-green-600">
            <Brain size={20} />
            Train Model
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-primary-blue text-primary-blue rounded-lg font-medium transition-all hover:bg-primary-light">
            <TrendingUp size={20} />
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
