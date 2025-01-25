import React from 'react';
import Dashboard from './components/Dashboard';
import { DashboardProvider } from './context/DashboardContext';

function App() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dynamic Dashboard</h1>
          </div>
        </header>
        <main className="w-full max-w-7xl mx-auto">
          <Dashboard />
        </main>
      </div>
    </DashboardProvider>
  );
}

export default App;