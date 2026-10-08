const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const path = require("path");

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.send("CareerPath AI Backend is running!");
});
app.get("/api/careers", (req, res) => {
    res.json([
        {
            name: "Software Developer",
            skills: ["JavaScript", "Problem Solving", "Programming"]
        },
        {
            name: "Data Scientist",
            skills: ["Python", "Statistics", "Machine Learning"]
        },
        {
            name: "UI/UX Designer",
            skills: ["Figma", "Design", "Creativity"]
        }
    ]);
});
app.post("/api/chat", (req, res) => {
    const answers = req.body.answers;

    const roadmap = {
        career: answers.dreamJob,
        stages: [
            {
                id: "stage1",
                title: "Foundation",
                skills: [
                    "Understand the basics",
                    "Build programming fundamentals"
                ]
            },
            {
                id: "stage2",
                title: "Core Skills",
                skills: [
                    "Learn job-specific technologies",
                    "Practice problem solving"
                ]
            },
            {
                id: "stage3",
                title: "Projects",
                skills: [
                    "Build beginner projects",
                    "Build real-world projects"
                ]
            },
            {
                id: "stage4",
                title: "Portfolio",
                skills: [
                    "Create GitHub portfolio",
                    "Document your projects"
                ]
            },
            {
                id: "stage5",
                title: "Experience",
                skills: [
                    "Apply for internships",
                    "Work on practical projects"
                ]
            },
            {
                id: "stage6",
                title: "Career",
                skills: [
                    "Prepare for interviews",
                    "Apply for jobs"
                ]
            }
        ]
    };

    res.json(roadmap);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});