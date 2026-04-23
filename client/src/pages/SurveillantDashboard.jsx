import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Circle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const SurveillantDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState({ studentCount: 0, absentCount: 0, observations: '', type: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/tasks/assignments?userId=${user.id}`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenLog = (task) => {
    setSelectedTask(task);
    setFormData({ studentCount: 0, absentCount: 0, observations: '', type: task.type === 'RESTAURANT' ? 'BREAKFAST' : '' });
    setShowLogModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTask.type === 'ABSENCE' || selectedTask.type === 'WEEKEND') {
        await axios.post(`${API_BASE_URL}/tasks/absences`, {
          assignmentId: selectedTask.id,
          ...formData
        });
      } else {
        await axios.post(`${API_BASE_URL}/tasks/restaurant`, {
          assignmentId: selectedTask.id,
          ...formData
        });
      }
      setShowLogModal(false);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem' }}>Personal Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Tasks assigned to you for today</p>
      </header>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem' }}>Today's Tasks</h3>
        
        {tasks.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No tasks assigned for today.</p>
        ) : (
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Dortoir</th>
                <th>Shift</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.type}</td>
                  <td>{task.dortoir?.name || 'N/A'}</td>
                  <td>{task.shift || 'N/A'}</td>
                  <td>
                    {task.completed ? (
                      <span className="badge badge-done" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', width: 'fit-content' }}>
                        <CheckCircle2 size={14} /> Completed
                      </span>
                    ) : (
                      <span className="badge badge-pending" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', width: 'fit-content' }}>
                        <Circle size={14} /> Pending
                      </span>
                    )}
                  </td>
                  <td>
                    {!task.completed && (
                      <button onClick={() => handleOpenLog(task)} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}>
                        Log Progress
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showLogModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ marginBottom: '1.5rem' }}>Log {selectedTask.type}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Student Count</label>
                <input type="number" value={formData.studentCount} onChange={e => setFormData({...formData, studentCount: parseInt(e.target.value)}) } required />
              </div>

              {(selectedTask.type === 'ABSENCE' || selectedTask.type === 'WEEKEND') && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Absent Count</label>
                  <input type="number" value={formData.absentCount} onChange={e => setFormData({...formData, absentCount: parseInt(e.target.value)}) } required />
                </div>
              )}

              {selectedTask.type === 'RESTAURANT' && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Meal Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="BREAKFAST">Petit déjeuner</option>
                    <option value="LUNCH">Déjeuner</option>
                    <option value="DINNER">Dîner</option>
                  </select>
                </div>
              )}

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Observations</label>
                <textarea rows="3" value={formData.observations} onChange={e => setFormData({...formData, observations: e.target.value})} />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Submit</button>
                <button type="button" onClick={() => setShowLogModal(false)} className="btn" style={{ flex: 1, background: 'var(--border)' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveillantDashboard;
