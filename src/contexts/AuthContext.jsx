import { createContext, useContext, useState, useCallback } from 'react';
import { profiles } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    const profile = profiles.find((p) => p.email === email);
    if (!profile) {
      setLoading(false);
      throw new Error('Invalid email or password');
    }
    // Mock password check — any non-empty password works
    if (!password) {
      setLoading(false);
      throw new Error('Password is required');
    }

    setUser(profile);
    setLoading(false);
    return profile;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const isAdmin = user?.role === 'admin' || user?.role === 'consultant';
  const isGc = user?.role === 'gc';

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin, isGc }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
