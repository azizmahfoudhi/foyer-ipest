import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, ClipboardCheck, Wrench, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, absences: 0, restaurant: 0, pendingReclamations: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/stats');
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem' }}>Admin Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Overview of foyer activities and stats</p>
      </header>

      <div className="stat-grid">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Users</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.users}</h3>
            </div>
            <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '50%', color: 'var(--primary)' }}>
              <Users size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Daily Absences</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.absences}</h3>
            </div>
            <div style={{ background: '#ecfdf5', padding: '0.75rem', borderRadius: '50%', color: 'var(--success)' }}>
              <ClipboardCheck size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Restaurant Logs</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.restaurant}</h3>
            </div>
            <div style={{ background: '#fffbeb', padding: '0.75rem', borderRadius: '50%', color: 'var(--warning)' }}>
              <TrendingUp size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Pending Reclamations</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.pendingReclamations}</h3>
            </div>
            <div style={{ background: '#fef2f2', padding: '0.75rem', borderRadius: '50%', color: 'var(--danger)' }}>
              <Wrench size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem' }}>Recent Activity Logs</h3>
        <p style={{ color: 'var(--text-muted)' }}>Activity tracking feature coming soon...</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
