import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(
    () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null)
  );

  const setToken = (token: string | null) => {
    setTokenState(token);
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}; 