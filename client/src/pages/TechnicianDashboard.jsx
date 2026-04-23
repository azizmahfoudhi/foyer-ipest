import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Wrench, CheckCircle, Clock } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const TechnicianDashboard = () => {
  const { user } = useAuth();
  const [reclamations, setReclamations] = useState([]);

  useEffect(() => {
    fetchReclamations();
  }, []);

  const fetchReclamations = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/reclamations`);
      setReclamations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(`${API_BASE_URL}/reclamations/${id}`, { status, technicianId: user.id });
      fetchReclamations();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem' }}>Maintenance Tasks</h1>
        <p style={{ color: 'var(--text-muted)' }}>List of reported issues and reclamations</p>
      </header>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem' }}>Open Reclamations</h3>
        
        {reclamations.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No reclamations found.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {reclamations.map(item => (
              <div key={item.id} className="card" style={{ padding: '1.25rem', border: '1px solid var(--border)', boxShadow: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.125rem' }}>{item.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Reported by: {item.createdBy?.name || 'Unknown'}</p>
                  </div>
                  <span className={`badge badge-${item.status.toLowerCase().replace('_', '-')}`}>
                    {item.status}
                  </span>
                </div>
                
                <p style={{ marginBottom: '1.25rem', color: 'var(--text-main)' }}>{item.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {item.status === 'PENDING' && (
                      <button onClick={() => handleUpdateStatus(item.id, 'IN_PROGRESS')} className="btn" style={{ background: '#fef3c7', color: '#92400e', fontSize: '0.875rem' }}>
                        <Clock size={16} /> Start Fixing
                      </button>
                    )}
                    {item.status !== 'DONE' && (
                      <button onClick={() => handleUpdateStatus(item.id, 'DONE')} className="btn" style={{ background: '#dcfce7', color: '#166534', fontSize: '0.875rem' }}>
                        <CheckCircle size={16} /> Mark as Done
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicianDashboard;
