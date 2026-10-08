const express = require("express");

const app = express();
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
    const message = req.body.message;

    const reply =
        "I can help you create a roadmap for " +
        message +
        ". We will identify the required skills, learning steps, projects, and career goals.";

    res.json({ reply: reply });
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});