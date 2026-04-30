import React from 'react';
import './OverallProgress.css';

export default function OverallProgress({ total, done, pct }) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="overall-prog">
      <div className="prog-ring-wrap">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--bg3)" strokeWidth="8"/>
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="url(#progGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />
          <defs>
            <linearGradient id="progGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="ring-label">
          <span className="ring-pct">{pct}%</span>
          <span className="ring-sub">done</span>
        </div>
      </div>
      <div className="prog-stats">
        <div className="prog-stat">
          <span className="ps-num">{done}</span>
          <span className="ps-label">Solved</span>
        </div>
        <div className="prog-divider"></div>
        <div className="prog-stat">
          <span className="ps-num">{total - done}</span>
          <span className="ps-label">Remaining</span>
        </div>
        <div className="prog-divider"></div>
        <div className="prog-stat">
          <span className="ps-num">{total}</span>
          <span className="ps-label">Total</span>
        </div>
      </div>
    </div>
  );
}
