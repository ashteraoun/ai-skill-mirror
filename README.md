<div align="center">
  <img src="https://img.shields.io/badge/Laravel-11.x-red.svg?style=for-the-badge&logo=laravel" alt="Laravel">
  <img src="https://img.shields.io/badge/React-18.x-blue.svg?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Node.js-18.x-green.svg?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/MySQL-8.0-orange.svg?style=for-the-badge&logo=mysql" alt="MySQL">
  
  <h1>✨ AI Skill Mirror - Talent Analyzer & Career Showcase</h1>
  
  <p>
    <strong>An AI-powered platform that analyzes your technical skills and provides personalized career insights</strong>
  </p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#demo">Demo</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#api-documentation">API Docs</a>
  </p>
</div>

---

## 🎯 Overview

**AI Skill Mirror** is a full-stack web application that uses artificial intelligence to analyze your technical skills from text input, GitHub bio, or resume paste. It then generates a comprehensive skill profile including talent score, career recommendations, and a personalized learning roadmap.

### 🤔 Why This Project?

- 🚀 **Instant Skill Assessment** - Get AI-powered analysis of your technical capabilities in seconds
- 💼 **Career Guidance** - Receive personalized career recommendations based on your skills
- 📚 **Learning Path** - Get actionable steps to improve and advance your career
- 📊 **Track Progress** - Save and review all your analyses to see growth over time

---

## ✨ Features

### Core Features
- 🤖 **AI-Powered Analysis** - Advanced skill detection and categorization
- 📊 **Talent Score (0-100)** - Quantitative assessment of your skill level
- 🎯 **Career Suggestions** - Top 3 career roles with match percentages
- 🗺️ **Learning Roadmap** - Personalized improvement plan
- 💾 **History Tracking** - Save and review all past analyses
- 🎨 **Modern UI** - Glassmorphism design with smooth animations

### Technical Highlights
- ⚡ **Microservices Architecture** - Laravel (backend) + Node.js (AI service)
- 🔄 **RESTful APIs** - Clean, documented API endpoints
- 📱 **Responsive Design** - Works perfectly on all devices
- 🗄️ **Database Persistence** - MySQL for storing analysis history

---

## 🎬 Demo

<div align="center">
  <img src="https://via.placeholder.com/800x400?text=AI+Skill+Mirror+Demo" alt="Demo Screenshot" width="80%">
  
  *Live demo coming soon!*
</div>

### Sample Output

```json
{
  "talent_score": 85,
  "skills_breakdown": {
    "Frontend": {
      "skills": ["React", "JavaScript", "HTML/CSS"],
      "level": "Advanced"
    },
    "Backend": {
      "skills": ["Node.js", "Python"],
      "level": "Intermediate"
    }
  },
  "career_suggestions": [
    {
      "role": "Full Stack Developer",
      "match": 92,
      "reason": "Strong frontend and backend skills"
    }
  ]
}
