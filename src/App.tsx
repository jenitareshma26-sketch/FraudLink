import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './features/store';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScamNetworkVisualization from './pages/ScamNetworkVisualization';
import TransactionMonitoring from './pages/TransactionMonitoring';
import UserProfileInvestigation from './pages/UserProfileInvestigation';
import FraudAlerts from './pages/FraudAlerts';
import NotificationCenter from './pages/NotificationCenter';
import RiskAnalysis from './pages/RiskAnalysis';
import DeviceIPTracking from './pages/DeviceIPTracking';
import CaseManagement from './pages/CaseManagement';
import ReportsAnalytics from './pages/ReportsAnalytics';
import AdminSettings from './pages/AdminSettings';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to='/' replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/network'
          element={
            <ProtectedRoute>
              <ScamNetworkVisualization />
            </ProtectedRoute>
          }
        />
        {/* App pages */}
        <Route path='/transactions' element={<ProtectedRoute><TransactionMonitoring /></ProtectedRoute>} />
        <Route path='/alerts' element={<ProtectedRoute><FraudAlerts /></ProtectedRoute>} />
        <Route path='/notifications' element={<ProtectedRoute><NotificationCenter /></ProtectedRoute>} />
        <Route path='/profiles' element={<ProtectedRoute><UserProfileInvestigation /></ProtectedRoute>} />
        <Route path='/cases' element={<ProtectedRoute><CaseManagement /></ProtectedRoute>} />
        <Route path='/devices' element={<ProtectedRoute><DeviceIPTracking /></ProtectedRoute>} />
        <Route path='/analytics' element={<ProtectedRoute><RiskAnalysis /></ProtectedRoute>} />
        <Route path='/reports' element={<ProtectedRoute><ReportsAnalytics /></ProtectedRoute>} />
        <Route path='/settings' element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
