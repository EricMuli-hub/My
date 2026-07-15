import React from 'react';

export default function AdminPanel() {
  return (
    <div className="dashboard">
      <h2>⚙️ Admin Panel</h2>
      <h3>Registered Users</h3>
      <ul>
        <li>🏛️ Mount Kenya University (Registered ✅) – 0.1 ETH paid</li>
        <li>🔍 TechCorp HR (Registered ✅) – 0.5 ETH paid</li>
        <li>👨‍🎓 Student A (Pending)</li>
      </ul>
      <h3>System Status</h3>
      <ul>
        <li>Blockchain: ✅ Running (localhost:8545)</li>
        <li>IPFS: ✅ Connected</li>
        <li>AI Anomaly Detector: ✅ Active</li>
      </ul>
    </div>
  );
}