import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { user } = useAuth();
  return (
    <div className="landing">
      <header className="hero">
        <h1>🎓 Blockchain Academic Credential Verification</h1>
        <p>Decentralized · Tamper-Proof · AI-Secured</p>
        <div className="cta">
          {user ? (
            <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="btn-primary">Login</Link>
              <Link to="/register" className="btn-secondary">Register</Link>
            </>
          )}
        </div>
      </header>
      <section className="features">
        <div className="feature"><h3>🏛️ Institutions</h3><p>Issue unforgeable blockchain credentials</p></div>
        <div className="feature"><h3>👨‍🎓 Students</h3><p>View credentials (read-only, no print)</p></div>
        <div className="feature"><h3>🔍 Employers</h3><p>Verify credentials in seconds</p></div>
      </section>
    </div>
  );
}