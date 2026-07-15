import React, { useState } from 'react';

export default function EmployerDashboard() {
  const [studentId, setStudentId] = useState('');
  const [cid, setCid] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    setError('');
    setResult(null);
    if (!studentId || !cid) {
      setError('Please enter both Student ID and CID');
      return;
    }
    // Simulate blockchain verification
    setResult({
      valid: true,
      revoked: false,
      name: 'John Doe',
      degree: 'BSc Computer Science',
      institution: 'Mount Kenya University',
      issuanceDate: '2026-07-15'
    });
  };

  return (
    <div className="dashboard">
      <h2>🔍 Employer / Verifier Dashboard</h2>
      <p>Verify a candidate's academic credential</p>
      <input placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} style={{ width: '100%', padding: '0.8rem', marginBottom: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
      <input placeholder="Credential CID (from student)" value={cid} onChange={(e) => setCid(e.target.value)} style={{ width: '100%', padding: '0.8rem', marginBottom: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
      <button onClick={handleVerify} style={{ padding: '0.8rem 2rem', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Verify</button>
      {error && <div className="error">{error}</div>}
      {result && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#e8f5e9', borderRadius: '8px' }}>
          <h3>✅ Verification Result</h3>
          <p><strong>Valid:</strong> {result.valid ? 'Yes' : 'No'}</p>
          <p><strong>Revoked:</strong> {result.revoked ? 'Yes' : 'No'}</p>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Degree:</strong> {result.degree}</p>
          <p><strong>Institution:</strong> {result.institution}</p>
          <p><strong>Issued:</strong> {result.issuanceDate}</p>
        </div>
      )}
    </div>
  );
}