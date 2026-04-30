import React from 'react';
import { useProgress } from '../context/ProgressContext';
import './ProblemRow.css';

const LevelBadge = ({ level }) => (
  <span className={`level-badge level-${level.toLowerCase()}`}>{level}</span>
);

const LinkBtn = ({ href, label, icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`link-btn link-${label.toLowerCase()}`} title={label}>
    {icon} <span>{label}</span>
  </a>
);

export default function ProblemRow({ problem, index }) {
  const { progress, toggleProblem } = useProgress();
  const completed = !!progress[problem.id];

  return (
    <div className={`problem-row ${completed ? 'completed' : ''}`}>
      <div className="problem-check">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleProblem(problem.id)}
          id={`chk-${problem.id}`}
        />
        <label htmlFor={`chk-${problem.id}`} className="custom-checkbox">
          {completed && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          )}
        </label>
      </div>

      <div className="problem-title-wrap">
        <span className="problem-num">#{index.toString().padStart(2, '0')}</span>
        <span className={`problem-title ${completed ? 'done' : ''}`}>{problem.title}</span>
      </div>

      <div className="problem-level">
        <LevelBadge level={problem.level} />
      </div>

      <div className="problem-links">
        {problem.youtube && (
          <LinkBtn href={problem.youtube} label="YT" icon="▶" />
        )}
        {problem.leetcode && (
          <LinkBtn href={problem.leetcode} label="LC" icon="⚡" />
        )}
        {problem.article && (
          <LinkBtn href={problem.article} label="GFG" icon="📄" />
        )}
      </div>
    </div>
  );
}
