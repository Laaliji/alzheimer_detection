import React from 'react';
import { Users, Brain, TrendingUp, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-text-dark dark:text-dark-text mb-2 transition-colors duration-300">Dashboard Overview</h2>
        <p className="text-text-gray dark:text-dark-text-secondary text-base transition-colors duration-300">Real-time analytics and system status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary-blue to-accent-teal dark:from-blue-600 dark:to-cyan-600 text-white p-6 rounded-xl shadow-medium dark:shadow-dark-medium transition-all duration-300">
          <Users size={32} />
          <div className="text-4xl font-bold my-2">247</div>
          <div className="text-sm opacity-90">Total Patients Analyzed</div>
        </div>

        <div className="bg-gradient-to-br from-secondary-green to-green-600 dark:from-green-500 dark:to-green-700 text-white p-6 rounded-xl shadow-medium dark:shadow-dark-medium transition-all duration-300">
          <Brain size={32} />
          <div className="text-4xl font-bold my-2">89.4%</div>
          <div className="text-sm opacity-90">Model Accuracy</div>
        </div>

        <div className="bg-gradient-to-br from-accent-teal to-primary-blue dark:from-cyan-600 dark:to-blue-600 text-white p-6 rounded-xl shadow-medium dark:shadow-dark-medium transition-all duration-300">
          <TrendingUp size={32} />
          <div className="text-4xl font-bold my-2">24</div>
          <div className="text-sm opacity-90">Analyses This Week</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-soft dark:shadow-dark-soft p-6 border border-border-light dark:border-dark-border transition-colors duration-300">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light dark:border-dark-border transition-colors duration-300">
            <h3 className="text-2xl font-semibold text-text-dark dark:text-dark-text flex items-center gap-2 transition-colors duration-300">
              <Clock size={24} />
              Recent Activity
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 p-4 bg-bg-gray dark:bg-dark-bg-tertiary rounded-lg transition-all hover:bg-primary-light dark:hover:bg-dark-border hover:translate-x-1">
              <div className="w-3 h-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-text-dark dark:text-dark-text mb-1 transition-colors duration-300">Patient #1247 analysis completed</p>
                <p className="text-sm text-text-gray dark:text-dark-text-secondary transition-colors duration-300">2 minutes ago</p>
              </div>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 transition-colors duration-300">Completed</span>
            </div>

            <div className="flex items-center gap-4 p-4 bg-bg-gray dark:bg-dark-bg-tertiary rounded-lg transition-all hover:bg-primary-light dark:hover:bg-dark-border hover:translate-x-1">
              <div className="w-3 h-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-text-dark dark:text-dark-text mb-1 transition-colors duration-300">Model training in progress</p>
                <p className="text-sm text-text-gray dark:text-dark-text-secondary transition-colors duration-300">15 minutes ago</p>
              </div>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 transition-colors duration-300">In Progress</span>
            </div>

            <div className="flex items-center gap-4 p-4 bg-bg-gray dark:bg-dark-bg-tertiary rounded-lg transition-all hover:bg-primary-light dark:hover:bg-dark-border hover:translate-x-1">
              <div className="w-3 h-3">
                <div className="w-3 h-3 bg-primary-blue rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-text-dark dark:text-dark-text mb-1 transition-colors duration-300">New data uploaded - 5 patients</p>
                <p className="text-sm text-text-gray dark:text-dark-text-secondary transition-colors duration-300">1 hour ago</p>
              </div>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-light dark:bg-blue-900/30 text-primary-blue dark:text-blue-400 transition-colors duration-300">Uploaded</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-soft dark:shadow-dark-soft p-6 border border-border-light dark:border-dark-border transition-colors duration-300">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light dark:border-dark-border transition-colors duration-300">
            <h3 className="text-2xl font-semibold text-text-dark dark:text-dark-text flex items-center gap-2 transition-colors duration-300">
              <Brain size={24} />
              Model Performance
            </h3>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-24 font-medium text-text-dark dark:text-dark-text text-sm transition-colors duration-300">Sensitivity</div>
              <div className="flex-1 h-3 bg-bg-gray dark:bg-dark-bg-tertiary rounded-full overflow-hidden transition-colors duration-300">
                <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: '92%' }}></div>
              </div>
              <div className="w-12 text-right font-semibold text-text-dark dark:text-dark-text transition-colors duration-300">92%</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-24 font-medium text-text-dark dark:text-dark-text text-sm transition-colors duration-300">Specificity</div>
              <div className="flex-1 h-3 bg-bg-gray dark:bg-dark-bg-tertiary rounded-full overflow-hidden transition-colors duration-300">
                <div className="h-full bg-primary-blue rounded-full transition-all duration-500" style={{ width: '87%' }}></div>
              </div>
              <div className="w-12 text-right font-semibold text-text-dark dark:text-dark-text transition-colors duration-300">87%</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-24 font-medium text-text-dark dark:text-dark-text text-sm transition-colors duration-300">Precision</div>
              <div className="flex-1 h-3 bg-bg-gray dark:bg-dark-bg-tertiary rounded-full overflow-hidden transition-colors duration-300">
                <div className="h-full bg-secondary-green rounded-full transition-all duration-500" style={{ width: '89%' }}></div>
              </div>
              <div className="w-12 text-right font-semibold text-text-dark dark:text-dark-text transition-colors duration-300">89%</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-24 font-medium text-text-dark dark:text-dark-text text-sm transition-colors duration-300">F1 Score</div>
              <div className="flex-1 h-3 bg-bg-gray dark:bg-dark-bg-tertiary rounded-full overflow-hidden transition-colors duration-300">
                <div className="h-full bg-accent-teal rounded-full transition-all duration-500" style={{ width: '90%' }}></div>
              </div>
              <div className="w-12 text-right font-semibold text-text-dark dark:text-dark-text transition-colors duration-300">90%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-soft dark:shadow-dark-soft p-6 border border-border-light dark:border-dark-border transition-colors duration-300">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light dark:border-dark-border transition-colors duration-300">
          <h3 className="text-2xl font-semibold text-text-dark dark:text-dark-text transition-colors duration-300">Quick Actions</h3>
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
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-primary-blue text-primary-blue dark:text-white rounded-lg font-medium transition-all hover:bg-primary-light dark:hover:bg-dark-bg-tertiary">
            <TrendingUp size={20} />
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
