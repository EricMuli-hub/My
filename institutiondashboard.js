import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function InstitutionDashboard() {
  const { user } = useAuth();
  const [msg, setMsg] = useState('');
  const [issued, setIssued] = useState([]);

  const handleIssue = () => {
    const cred = { id: Date.now(), name: 'Jane Doe', degree: 'BSc IT', institution: user.name || 'MKU' };
    setIssued([cred, ...issued]);
    setMsg('✅ Credential issued on blockchain (simulated)');
  };

  const handlePrint = (cred) => {
    alert(`🖨️ Printing hardcopy for: ${cred.name} - ${cred.degree}\n(Only institutions can print)`);
  };

  return (
    <div className="dashboard">
      <h2>🏛️ Institution Dashboard</h2>
      <p><strong>{user.name || 'Institution'}</strong> – Issuing Authority</p>
      <button onClick={handleIssue} style={{ padding: '0.8rem 2rem', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        + Issue New Credential (Simulate)
      </button>
      {msg && <p style={{ color: 'green' }}>{msg}</p>}
      <h3>Issued Credentials</h3>
      <ul>
        {issued.length === 0 ? <li>No credentials issued yet.</li> : issued.map(cred => (
          <li key={cred.id}>
            <strong>{cred.name}</strong> – {cred.degree} ({cred.institution})
            <br />
            <button onClick={() => handlePrint(cred)} style={{ marginTop: '5px', padding: '0.3rem 1rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              🖨️ Print Hardcopy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}