import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './History.css';

const API_URL = 'http://localhost:8000/api';

function History() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/history`);
      if (response.data.success) {
        setAnalyses(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="history">
      {loading ? (
        <div className="loading">Loading history...</div>
      ) : analyses.length === 0 ? (
        <div className="glass-card empty-state">
          <p>No analyses yet. Go to Analyze tab to create your first skill analysis!</p>
        </div>
      ) : (
        <>
          <div className="history-list">
            {analyses.map((analysis) => (
              <div 
                key={analysis.id} 
                className={`glass-card history-item ${selectedAnalysis?.id === analysis.id ? 'active' : ''}`}
                onClick={() => setSelectedAnalysis(analysis)}
              >
                <div className="history-header">
                  <span className="history-date">{formatDate(analysis.created_at)}</span>
                  <span className="history-score">Score: {analysis.talent_score}</span>
                </div>
                <p className="history-preview">
                  {analysis.user_input.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>

          {selectedAnalysis && (
            <div className="glass-card analysis-detail">
              <h3>Analysis Details</h3>
              <div className="detail-section">
                <h4>Original Input</h4>
                <p>{selectedAnalysis.user_input}</p>
              </div>
              <div className="detail-section">
                <h4>Talent Score: {selectedAnalysis.talent_score}/100</h4>
                <div className="score-bar-detail">
                  <div 
                    className="score-fill-detail" 
                    style={{ width: `${selectedAnalysis.talent_score}%` }}
                  ></div>
                </div>
              </div>
              <div className="detail-section">
                <h4>AI Summary</h4>
                <p>{selectedAnalysis.ai_summary}</p>
              </div>
              <button 
                className="view-full-btn"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                View Full Analysis
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default History;