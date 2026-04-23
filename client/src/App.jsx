import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import SurveillantDashboard from './pages/SurveillantDashboard';
import TechnicianDashboard from './pages/TechnicianDashboard';
import Layout from './components/Layout';
import './index.css';

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardRedirect />
            </ProtectedRoute>
          } />

          <Route element={<Layout />}>
            <Route path="/admin" element={
              <ProtectedRoute roles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/surveillant" element={
              <ProtectedRoute roles={['SURVEILLANT', 'ADMIN']}>
                <SurveillantDashboard />
              </ProtectedRoute>
            } />
            <Route path="/technician" element={
              <ProtectedRoute roles={['TECHNICIAN', 'ADMIN']}>
                <TechnicianDashboard />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

const DashboardRedirect = () => {
  const { user } = useAuth();
  if (user.role === 'ADMIN') return <Navigate to="/admin" />;
  if (user.role === 'SURVEILLANT') return <Navigate to="/surveillant" />;
  if (user.role === 'TECHNICIAN') return <Navigate to="/technician" />;
  return <Navigate to="/login" />;
};

export default App;
