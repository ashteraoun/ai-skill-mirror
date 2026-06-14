import React, { useState } from 'react';
import axios from 'axios';
import './Analyzer.css';

const API_URL = 'http://localhost:8000/api';

function Analyzer() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!input.trim()) {
      setError('Please enter your skills or paste your resume');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_URL}/analyze`, {
        user_input: input
      });
      
      if (response.data.success) {
        setResult(response.data.data);
      } else {
        setError('Analysis failed. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure Laravel backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyzer">
      <div className="glass-card input-card">
        <h2>Paste Your Skills or Resume</h2>
        <textarea
          className="skill-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Example:&#10;I have 3 years of experience in React, Node.js, and MongoDB. I've built several full-stack applications and I'm familiar with Docker and AWS. I'm currently learning Python for data science and machine learning with TensorFlow."
          rows={8}
        />
        <button 
          className="analyze-btn"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : '✨ Analyze My Talent'}
        </button>
        {error && <div className="error-message">{error}</div>}
      </div>

      {result && (
        <div className="result-container">
          <div className="glass-card score-card">
            <h3>Talent Score</h3>
            <div className="score-meter">
              <div className="score-circle">
                <span className="score-value">{result.talent_score}</span>
                <span className="score-max">/100</span>
              </div>
              <div className="score-bar">
                <div 
                  className="score-fill" 
                  style={{ width: `${result.talent_score}%` }}
                ></div>
              </div>
            </div>
            <p className="score-explanation">
              {result.talent_score >= 80 ? '🌟 Exceptional talent!' : 
               result.talent_score >= 60 ? '👍 Strong foundation' : 
               '📚 Good potential for growth'}
            </p>
          </div>

          <div className="glass-card skills-card">
            <h3>📊 Skills Breakdown</h3>
            <div className="skills-grid">
              {Object.entries(result.skills_breakdown).map(([category, data]) => (
                <div key={category} className="skill-item">
                  <div className="skill-category">{category}</div>
                  <div className="skill-level">{data.level}</div>
                  <div className="skill-tags">
                    {data.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card careers-card">
            <h3>💼 Recommended Careers</h3>
            <div className="careers-list">
              {result.career_suggestions.map((career, idx) => (
                <div key={idx} className="career-item">
                  <div className="career-role">{career.role}</div>
                  <div className="career-match">
                    <div className="match-bar">
                      <div 
                        className="match-fill" 
                        style={{ width: `${career.match}%` }}
                      ></div>
                    </div>
                    <span className="match-percent">{career.match}% Match</span>
                  </div>
                  <div className="career-reason">{career.reason}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card roadmap-card">
            <h3>🗺️ Learning Roadmap</h3>
            <ul className="roadmap-list">
              {result.improvement_roadmap.map((step, idx) => (
                <li key={idx} className="roadmap-step">
                  <span className="step-number">{idx + 1}</span>
                  <span className="step-text">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card summary-card">
            <h3>🤖 AI Summary</h3>
            <p className="ai-summary">{result.ai_summary}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analyzer;