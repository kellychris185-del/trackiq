import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Simple localStorage-based storage API to match Claude artifact API
window.storage = {
  get: async (key) => {
    try {
      const val = localStorage.getItem('trackiq_' + key);
      if (val === null) throw new Error('Not found');
      return { key, value: val };
    } catch(e) { throw e; }
  },
  set: async (key, value) => {
    localStorage.setItem('trackiq_' + key, value);
    return { key, value };
  },
  delete: async (key) => {
    localStorage.removeItem('trackiq_' + key);
    return { key, deleted: true };
  },
  list: async (prefix) => {
    const keys = Object.keys(localStorage)
      .filter(k => k.startsWith('trackiq_' + (prefix||'')))
      .map(k => k.replace('trackiq_', ''));
    return { keys };
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
