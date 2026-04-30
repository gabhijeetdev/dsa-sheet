import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar({ user }) {
  const { logout } = useAuth();
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() || 'U';

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="nav-brand">
          <span className="nav-icon">⚡</span>
          <span className="nav-title">DSA Master</span>
          <span className="nav-badge">SHEET</span>
        </div>
        <div className="nav-right">
          <div className="nav-user">
            <div className="user-avatar">{initials}</div>
            <span className="user-name">{user?.name || 'Student'}</span>
          </div>
          <button className="logout-btn" onClick={logout} title="Logout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
