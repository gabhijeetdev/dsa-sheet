import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import dsaData from '../data/dsaProblems';
import TopicCard from '../components/TopicCard';
import Navbar from '../components/Navbar';
import OverallProgress from '../components/OverallProgress';
import './DashboardPage.css';

export default function DashboardPage() {
  const { user } = useAuth();
  const { getTotalProgress } = useProgress();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [expandedTopic, setExpandedTopic] = useState(null);

  const totalProg = getTotalProgress(dsaData);

  const filtered = dsaData.map(topic => ({
    ...topic,
    problems: topic.problems.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchLevel = levelFilter === 'All' || p.level === levelFilter;
      return matchSearch && matchLevel;
    })
  })).filter(t => t.problems.length > 0 || search === '');

  return (
    <div className="dashboard-root">
      <Navbar user={user} />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="header-text">
            <h2>Welcome back, <span>{user?.name?.split(' ')[0] || 'Coder'}</span> 👋</h2>
            <p>Keep going! You're making great progress on your DSA journey.</p>
          </div>
          <OverallProgress total={totalProg.total} done={totalProg.done} pct={totalProg.pct} />
        </div>

        <div className="controls-bar">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="level-filters">
            {['All', 'Easy', 'Medium', 'Hard'].map(l => (
              <button
                key={l}
                className={`filter-btn ${levelFilter === l ? 'active' : ''} level-${l.toLowerCase()}`}
                onClick={() => setLevelFilter(l)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="topics-list">
          {filtered.map(topic => (
            <TopicCard
              key={topic.id}
              topic={topic}
              isExpanded={expandedTopic === topic.id}
              onToggle={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="empty-state">
              <span>🔍</span>
              <p>No problems found for "{search}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
