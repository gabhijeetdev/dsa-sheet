import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: '#070710', color: '#7c5cfc',
      fontFamily: "'Space Mono', monospace", fontSize: '14px', gap: '12px'
    }}>
      <div style={{
        width: 20, height: 20,
        border: '2px solid rgba(124,92,252,0.3)',
        borderTop: '2px solid #7c5cfc',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite'
      }}></div>
      Initializing DSA Master...
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
  return user ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/dashboard" element={
      <PrivateRoute>
        <ProgressProvider>
          <DashboardPage />
        </ProgressProvider>
      </PrivateRoute>
    } />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
