const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/ai/analyze', async (req, res) => {
    const { text } = req.body;

    // Simulate AI Processing (You would use OpenAI/Gemini API here)
    // The prompt would ask for valid JSON output
    const mockAIResponse = {
        score: Math.floor(Math.random() * (95 - 65) + 65),
        category: "Fullstack Developer",
        title: "Senior Product Engineer",
        summary: "An adaptable engineer with a strong grasp of both frontend reactivity and backend scalability. Excellent at bridging design and technical implementation.",
        skills: [
            { name: "React/Next.js", level: 92 },
            { name: "Laravel/PHP", level: 88 },
            { name: "System Design", level: 75 }
        ],
        careers: [
            { role: "Technical Lead", match: 94 },
            { role: "Solutions Architect", match: 82 },
            { role: "DevOps Engineer", match: 65 }
        ],
        roadmap: [
            "Master Advanced Kubernetes orchestration",
            "Deep dive into Distributed Systems and CAP theorem",
            "Contribute to high-impact Open Source projects"
        ]
    };

    // Simulate network delay
    setTimeout(() => res.json(mockAIResponse), 1500);
});

app.listen(5001, () => console.log('🚀 AI Node Service on port 5001'));