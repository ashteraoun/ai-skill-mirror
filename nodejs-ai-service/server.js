const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// AI Analysis Endpoint
app.post('/ai/analyze', async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ error: 'Text input is required' });
        }

        // Simulated AI response (Replace with actual OpenAI/Gemini API call)
        const analysisResult = await performAIAnalysis(text);
        
        res.json(analysisResult);
    } catch (error) {
        console.error('AI Analysis Error:', error);
        res.status(500).json({ error: 'AI service error' });
    }
});

// Mock AI Analysis (Replace with actual API call)
async function performAIAnalysis(text) {
    // Analyze skills based on keywords
    const skills = analyzeSkills(text);
    const score = calculateTalentScore(skills, text);
    const careers = suggestCareers(skills);
    const roadmap = generateRoadmap(skills);
    const summary = generateSummary(skills, score);
    
    return {
        talent_score: score,
        skills_breakdown: skills,
        career_suggestions: careers,
        improvement_roadmap: roadmap,
        ai_summary: summary
    };
}

function analyzeSkills(text) {
    const lowerText = text.toLowerCase();
    const categories = {
        'Frontend': ['react', 'vue', 'angular', 'javascript', 'typescript', 'html', 'css', 'next.js'],
        'Backend': ['node.js', 'python', 'java', 'php', 'laravel', 'django', 'spring', 'go', 'rust'],
        'AI/Machine Learning': ['tensorflow', 'pytorch', 'scikit-learn', 'nlp', 'computer vision', 'llm', 'openai'],
        'DevOps': ['docker', 'kubernetes', 'jenkins', 'ci/cd', 'aws', 'azure', 'gcp', 'terraform'],
        'Database': ['sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'firebase'],
        'Mobile': ['react native', 'flutter', 'swift', 'kotlin', 'android', 'ios'],
        'Cybersecurity': ['security', 'encryption', 'penetration testing', 'firewall', 'vulnerability']
    };
    
    const detected = {};
    for (const [category, keywords] of Object.entries(categories)) {
        const matched = keywords.filter(keyword => lowerText.includes(keyword));
        if (matched.length > 0) {
            detected[category] = {
                skills: matched,
                level: matched.length > 3 ? 'Advanced' : matched.length > 1 ? 'Intermediate' : 'Beginner'
            };
        }
    }
    
    // If no skills detected, add some default
    if (Object.keys(detected).length === 0) {
        detected['General Programming'] = {
            skills: ['programming fundamentals'],
            level: 'Beginner'
        };
    }
    
    return detected;
}

function calculateTalentScore(skills, text) {
    let score = 30; // Base score
    
    // Add points based on detected skills
    const skillCount = Object.values(skills).reduce((sum, cat) => sum + cat.skills.length, 0);
    score += Math.min(skillCount * 10, 40);
    
    // Add points for advanced skills
    const advancedCount = Object.values(skills).filter(cat => cat.level === 'Advanced').length;
    score += advancedCount * 10;
    
    // Bonus for text length (more detailed input)
    score += Math.min(Math.floor(text.length / 100), 20);
    
    return Math.min(score, 100);
}

function suggestCareers(skills) {
    const suggestions = [];
    
    if (skills['Frontend']) {
        suggestions.push({
            role: 'Frontend Developer',
            match: skills['Frontend'].level === 'Advanced' ? 95 : 75,
            reason: 'Strong frontend skills detected'
        });
    }
    
    if (skills['Backend']) {
        suggestions.push({
            role: 'Backend Engineer',
            match: skills['Backend'].level === 'Advanced' ? 95 : 75,
            reason: 'Solid backend development skills'
        });
    }
    
    if (skills['AI/Machine Learning']) {
        suggestions.push({
            role: 'AI/ML Engineer',
            match: skills['AI/Machine Learning'].level === 'Advanced' ? 98 : 85,
            reason: 'AI and machine learning expertise'
        });
    }
    
    if (skills['DevOps']) {
        suggestions.push({
            role: 'DevOps Engineer',
            match: 85,
            reason: 'Infrastructure and automation skills'
        });
    }
    
    if (skills['Mobile']) {
        suggestions.push({
            role: 'Mobile Developer',
            match: 80,
            reason: 'Mobile development experience'
        });
    }
    
    // Default suggestions if none matched
    if (suggestions.length === 0) {
        suggestions.push(
            {
                role: 'Software Developer',
                match: 70,
                reason: 'General programming foundation'
            },
            {
                role: 'Technical Support Engineer',
                match: 65,
                reason: 'Problem-solving capabilities'
            }
        );
    }
    
    return suggestions.slice(0, 3);
}

function generateRoadmap(skills) {
    const roadmap = [];
    
    if (!skills['Frontend']) {
        roadmap.push('Learn modern frontend frameworks (React/Vue) to become full-stack');
    } else if (skills['Frontend']?.level !== 'Advanced') {
        roadmap.push('Master advanced React patterns and state management');
    }
    
    if (!skills['Backend']) {
        roadmap.push('Study backend development with Node.js or Python');
    } else if (skills['Backend']?.level !== 'Advanced') {
        roadmap.push('Learn database optimization and API design patterns');
    }
    
    if (!skills['DevOps']) {
        roadmap.push('Get familiar with Docker and CI/CD pipelines');
    }
    
    if (!skills['AI/Machine Learning']) {
        roadmap.push('Take introductory ML course (Andrew Ng\'s ML course recommended)');
    }
    
    roadmap.push('Build 2-3 portfolio projects showcasing your skills');
    roadmap.push('Contribute to open source to gain real-world experience');
    
    return roadmap.slice(0, 5);
}

function generateSummary(skills, score) {
    const mainSkills = Object.keys(skills).slice(0, 3).join(', ');
    const level = score >= 80 ? 'exceptional' : score >= 60 ? 'strong' : 'developing';
    
    return `You have ${level} technical skills in ${mainSkills}. Your talent score of ${score} indicates ${score >= 70 ? 'great potential for senior roles' : 'good foundation for growth'}. ${score < 60 ? 'Focus on building practical projects to accelerate your learning.' : 'Keep building and expanding your expertise!'}`;
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'AI service is running' });
});

app.listen(PORT, () => {
    console.log(`🤖 AI Service running on port ${PORT}`);
});