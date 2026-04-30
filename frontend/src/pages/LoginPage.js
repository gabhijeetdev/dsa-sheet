import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (user) navigate('/dashboard'); }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isRegister) {
        await register(form.name, form.email, form.password);
      } else {
        await login(form.email, form.password);
      }
      navigate('/dashboard');
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Something went wrong. Is the backend running?';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <div className="login-bg">
        <div className="grid-overlay"></div>
        <div className="glow-orb glow-1"></div>
        <div className="glow-orb glow-2"></div>
      </div>

      <div className="login-left">
        <div className="brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-name">DSA Master</span>
        </div>
        <div className="hero-text">
          <h1>Level Up Your<br/><span className="gradient-text">DSA Skills</span></h1>
          <p>Track your progress through 60+ curated problems across 10 core topics. Resume exactly where you left off.</p>
        </div>
        <div className="stats-row">
          {['60+ Problems', '10 Topics', 'YouTube Links', 'Progress Saved'].map(s => (
            <div key={s} className="stat-chip">{s}</div>
          ))}
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="tab-switcher">
            <button className={!isRegister ? 'active' : ''} onClick={() => { setIsRegister(false); setError(''); }}>Login</button>
            <button className={isRegister ? 'active' : ''} onClick={() => { setIsRegister(true); setError(''); }}>Register</button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {isRegister && (
              <div className="field">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
            )}
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Min 6 characters"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
                minLength={6}
              />
            </div>

            {error && <div className="error-msg">⚠ {error}</div>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <span className="spinner"></span> : (isRegister ? 'Create Account' : 'Login')}
            </button>
          </form>

          <div className="demo-hint">
            <span>New user?</span> Click Register to create your account
          </div>
        </div>
      </div>
    </div>
  );
}
