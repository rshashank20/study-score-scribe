import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const API_URL = 'http://localhost:4000/api';

const AuthForm: React.FC = () => {
  const { token, setToken, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) setMessage('Signup successful! You can now log in.');
    else setMessage(data.message || 'Signup failed');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      setToken(data.token);
      setMessage('Login successful!');
    } else setMessage(data.message || 'Login failed');
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Signup / Login</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" value={email} required onChange={e => setEmail(e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
        <input type="password" placeholder="Password" value={password} required onChange={e => setPassword(e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
        <button type="submit" style={{ width: '100%', marginBottom: 8 }}>Sign Up</button>
      </form>
      <form onSubmit={handleLogin}>
        <button type="submit" style={{ width: '100%', marginBottom: 8 }}>Log In</button>
      </form>
      {token && (
        <button onClick={logout} style={{ width: '100%', marginBottom: 8 }}>Log Out</button>
      )}
      <div style={{ color: 'green', marginTop: 8 }}>{message}</div>
      {token && (
        <div style={{ marginTop: 8, wordBreak: 'break-all' }}>
          <strong>JWT Token:</strong>
          <div style={{ fontSize: 12 }}>{token}</div>
        </div>
      )}
    </div>
  );
};

export default AuthForm; 