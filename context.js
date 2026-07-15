import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Demo login: admin@test.com / pass => Admin, anything else => Student
    if (email === 'admin@test.com' && password === 'pass') {
      const u = { name: 'Admin User', email, role: 'admin' };
      setUser(u);
      localStorage.setItem('user', JSON.stringify(u));
      return { success: true };
    } else if (email && password) {
      const u = { name: 'Student User', email, role: 'student' };
      setUser(u);
      localStorage.setItem('user', JSON.stringify(u));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (data) => {
    const u = { name: data.name, email: data.email, role: data.role };
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);