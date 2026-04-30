import React from 'react';
import { useProgress } from '../context/ProgressContext';
import ProblemRow from './ProblemRow';
import './TopicCard.css';

export default function TopicCard({ topic, isExpanded, onToggle }) {
  const { getTopicProgress } = useProgress();
  const prog = getTopicProgress(topic.problems);

  return (
    <div className={`topic-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="topic-header" onClick={onToggle}>
        <div className="topic-left">
          <span className="topic-icon">{topic.icon}</span>
          <div className="topic-info">
            <h3 className="topic-title">{topic.title}</h3>
            <p className="topic-desc">{topic.description}</p>
          </div>
        </div>
        <div className="topic-right">
          <div className="topic-prog-bar-wrap">
            <div className="topic-prog-numbers">
              <span className="prog-done">{prog.done}</span>
              <span className="prog-sep">/</span>
              <span className="prog-total">{prog.total}</span>
            </div>
            <div className="topic-prog-bar">
              <div
                className="topic-prog-fill"
                style={{ width: `${prog.pct}%` }}
              ></div>
            </div>
            <span className="prog-pct">{prog.pct}%</span>
          </div>
          <div className="level-counts">
            {['Easy', 'Medium', 'Hard'].map(lvl => {
              const count = topic.problems.filter(p => p.level === lvl).length;
              if (count === 0) return null;
              return (
                <span key={lvl} className={`lvl-badge lvl-${lvl.toLowerCase()}`}>
                  {count} {lvl}
                </span>
              );
            })}
          </div>
          <div className={`chevron ${isExpanded ? 'open' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="topic-problems">
          <div className="problems-table-header">
            <span className="th-status">Status</span>
            <span className="th-title">Problem</span>
            <span className="th-level">Level</span>
            <span className="th-links">Resources</span>
          </div>
          {topic.problems.map((problem, i) => (
            <ProblemRow key={problem.id} problem={problem} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
