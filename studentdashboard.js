import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function StudentDashboard() {
  const { user } = useAuth();
  return (
    <div className="dashboard">
      <h2>👨‍🎓 Student Dashboard</h2>
      <p>Welcome, <strong>{user.name}</strong></p>
      <p><em>📌 View only – printing disabled for students.</em></p>
      <h3>Your Credentials</h3>
      <ul>
        <li>
          <strong>BSc Computer Science</strong> - Mount Kenya University<br />
          Status: ✅ Valid &bull; Issued: 2026-07-15<br />
          <small>CID: QmW2r... (view only)</small>
        </li>
      </ul>
      <p style={{ color: '#888', fontSize: '0.9rem' }}>🔒 Hardcopy issuance only available at institution.</p>
    </div>
  );
}