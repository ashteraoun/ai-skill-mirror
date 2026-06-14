import React, { useState } from 'react';
import Analyzer from './components/Analyzer';
import History from './components/History';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('analyze');

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="title">
            <span className="gradient-text">AI Skill Mirror</span>
          </h1>
          <p className="subtitle">Your AI-Powered Talent Analyzer</p>
        </div>
      </header>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'analyze' ? 'active' : ''}`}
          onClick={() => setActiveTab('analyze')}
        >
          Analyze Skills
        </button>
        <button 
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>

      <div className="container">
        {activeTab === 'analyze' ? <Analyzer /> : <History />}
      </div>
    </div>
  );
}

export default App;