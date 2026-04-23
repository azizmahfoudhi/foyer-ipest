import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, Calendar, ClipboardCheck, Wrench, LogOut } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: '1.5rem' }}>Foyer Manager</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{user?.role}</p>
      </div>

      <nav style={{ flex: 1 }}>
        {user?.role === 'ADMIN' && (
          <>
            <NavLink to="/admin" className="nav-link">
              <LayoutDashboard size={20} /> Admin Dashboard
            </NavLink>
            <NavLink to="/admin/users" className="nav-link">
              <Users size={20} /> Users
            </NavLink>
            <NavLink to="/admin/calendar" className="nav-link">
              <Calendar size={20} /> Calendar
            </NavLink>
          </>
        )}

        {(user?.role === 'SURVEILLANT' || user?.role === 'ADMIN') && (
          <NavLink to="/surveillant" className="nav-link">
            <ClipboardCheck size={20} /> Tasks
          </NavLink>
        )}

        {(user?.role === 'TECHNICIAN' || user?.role === 'ADMIN') && (
          <NavLink to="/technician" className="nav-link">
            <Wrench size={20} /> Reclamations
          </NavLink>
        )}
      </nav>

      <button onClick={handleLogout} className="nav-link" style={{ background: 'transparent', width: '100%', marginTop: 'auto' }}>
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
