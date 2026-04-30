import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ProgressContext = createContext(null);
const API = process.env.REACT_APP_API_URL || '/api';

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchProgress = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API}/progress`);
      setProgress(res.data.progress || {});
    } catch (err) {
      console.error('Failed to fetch progress', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const toggleProblem = async (problemId) => {
    // Optimistic update
    const prev = progress[problemId] || false;
    setProgress(p => ({ ...p, [problemId]: !prev }));
    try {
      const res = await axios.post(`${API}/progress/toggle`, { problemId });
      setProgress(p => ({ ...p, [problemId]: res.data.completed }));
    } catch {
      setProgress(p => ({ ...p, [problemId]: prev }));
    }
  };

  const getTopicProgress = (problems) => {
    const total = problems.length;
    const done = problems.filter(p => progress[p.id]).length;
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  const getTotalProgress = (allTopics) => {
    const allProblems = allTopics.flatMap(t => t.problems);
    const total = allProblems.length;
    const done = allProblems.filter(p => progress[p.id]).length;
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  return (
    <ProgressContext.Provider value={{ progress, loading, toggleProblem, getTopicProgress, getTotalProgress, refetch: fetchProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
