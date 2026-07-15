import React from 'react';
import { useAuth } from '../context/AuthContext';
import StudentDashboard from './StudentDashboard';
import InstitutionDashboard from './InstitutionDashboard';
import EmployerDashboard from './EmployerDashboard';
import AdminPanel from './AdminPanel';

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return <div>Loading...</div>;
  switch (user.role) {
    case 'student': return <StudentDashboard />;
    case 'institution': return <InstitutionDashboard />;
    case 'verifier': return <EmployerDashboard />;
    case 'admin': return <AdminPanel />;
    default: return <div>Unknown role</div>;
  }
}