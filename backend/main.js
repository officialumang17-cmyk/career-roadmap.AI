const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

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

    const answers = req.body.answers || {};

    const career = answers.dreamJob || "Software Developer";
    const experience = answers.experience || "Beginner";
    const currentSkills = answers.skills || "Beginner";
    const interests = answers.interest || "Technology";
    const dailyTime = answers.hours || "2 hours";
    const goal = answers.goal || "Get a job";

    const roadmap = {
        career: career,

        profile: {
            education: answers.education || "Not specified",
            experience: experience,
            currentSkills: currentSkills,
            interests: interests,
            dailyTime: dailyTime,
            goal: goal,
            learningStyle: answers.learningStyle || "Not specified",
            timeline: answers.timeline || "Not specified",
            challenge: answers.challenge || "Not specified"
        },

        summary:
            `Based on your goal of becoming a ${career}, your current experience as ${experience}, your existing skills in ${currentSkills}, your interest in ${interests}, and your available study time of ${dailyTime}, this roadmap is designed specifically for you.`,

        stages: [

            {
                id: "stage1",
                title: "1. Analyze Your Current Level",
                duration: "1 week",
                type: "Assessment",

                learn: [
                    `Evaluate your current knowledge of ${currentSkills}`,
                    `Understand the skills required for ${career}`,
                    "Identify the gap between your current level and your target"
                ],

                practice: [
                    `Complete beginner tasks related to ${career}`,
                    "Identify your strongest and weakest areas"
                ],

                projects: [
                    `Build a small ${career}-related project using your existing skills`
                ],

                outcome:
                    `A clear understanding of what you already know and what you need to learn for ${career}.`,

                why:
                    `Your roadmap starts from your current ${experience} level instead of assuming that every learner starts from the same point.`
            },

            {
                id: "stage2",
                title: "2. Build Your Foundation",
                duration: answers.timeline || "1-2 months",
                type: "Foundation",

                learn: [
                    `Learn the fundamental concepts required for ${career}`,
                    "Programming and problem-solving fundamentals",
                    "Git and GitHub",
                    "Basic computer and development concepts"
                ],

                practice: [
                    `Practice for ${dailyTime} each day`,
                    "Solve small problems regularly",
                    "Build small exercises instead of only watching tutorials"
                ],

                projects: [
                    `Build 2 beginner-level projects related to ${interests}`
                ],

                outcome:
                    "You develop the foundation needed to move toward your target career.",

                why:
                    "Strong fundamentals prevent problems when you start advanced topics."
            },

            {
                id: "stage3",
                title: "3. Learn Career-Specific Skills",
                duration: "2-4 months",
                type: "Core Skills",

                learn: [
                    `Master the technologies commonly required for ${career}`,
                    `Focus on ${interests}`,
                    "Learn industry tools and workflows",
                    "Study concepts that appear frequently in job descriptions"
                ],

                practice: [
                    "Solve practical problems",
                    "Follow project-based exercises",
                    "Rebuild small applications to strengthen understanding"
                ],

                projects: [
                    `Build 2-3 projects specifically targeted toward ${career}`
                ],

                outcome:
                    `You become capable of applying your skills to real ${career}-related problems.`,

                why:
                    `Your learning is focused around ${career} instead of following a generic technology list.`
            },

            {
                id: "stage4",
                title: "4. Build Real-World Portfolio Projects",
                duration: "2-3 months",
                type: "Projects",

                learn: [
                    "Project architecture",
                    "APIs and databases",
                    "Testing and debugging",
                    "Deployment",
                    "Writing project documentation"
                ],

                practice: [
                    "Work on real-world problems",
                    "Use GitHub for version control",
                    "Build projects from scratch"
                ],

                projects: [
                    `1 beginner ${career} project`,
                    `2 intermediate projects based on ${interests}`,
                    "1 major portfolio project solving a real problem"
                ],

                outcome:
                    "A strong portfolio that demonstrates practical ability.",

                why:
                    "Employers need evidence that you can actually build and solve problems."
            },

            {
                id: "stage5",
                title: "5. Prepare Your Professional Profile",
                duration: "2-3 weeks",
                type: "Portfolio",

                learn: [
                    "Resume writing",
                    "GitHub optimization",
                    "LinkedIn profile",
                    "Project documentation"
                ],

                practice: [
                    "Explain your projects clearly",
                    "Write measurable project achievements",
                    "Practice presenting your technical work"
                ],

                projects: [
                    "Create a professional portfolio",
                    "Organize your best GitHub projects"
                ],

                outcome:
                    "A professional profile ready for internships and job applications.",

                why:
                    "A strong online and resume presence helps recruiters understand your capabilities."
            },

            {
                id: "stage6",
                title: "6. Gain Real Experience",
                duration: "1-4 months",
                type: "Experience",

                learn: [
                    "Team collaboration",
                    "Professional communication",
                    "Real-world development practices"
                ],

                practice: [
                    "Apply for internships",
                    "Participate in hackathons",
                    "Contribute to open source",
                    "Work on team projects"
                ],

                projects: [
                    "Complete at least one collaborative or real-world project"
                ],

                outcome:
                    "Practical experience that strengthens your resume.",

                why:
                    "Experience helps convert your learning into professional credibility."
            },

            {
                id: "stage7",
                title: "7. Prepare for Interviews",
                duration: "1-2 months",
                type: "Interview",

                learn: [
                    "Data Structures and Algorithms",
                    `Technical concepts related to ${career}`,
                    "Project-based interview questions",
                    "HR interview basics"
                ],

                practice: [
                    "Solve interview problems",
                    "Practice explaining your projects",
                    "Take mock interviews"
                ],

                projects: [
                    "Prepare detailed explanations of your strongest projects"
                ],

                outcome:
                    `You become prepared for ${career} interviews.`,

                why:
                    "Interview preparation helps you demonstrate the skills you developed."
            },

            {
                id: "stage8",
                title: "8. Start Applying",
                duration: "Ongoing",
                type: "Career",

                learn: [
                    "Job search strategies",
                    "Resume customization",
                    "Networking",
                    "Referrals"
                ],

                practice: [
                    "Apply to internships and entry-level roles",
                    "Track applications",
                    "Improve your resume based on feedback",
                    "Continue improving your portfolio"
                ],

                projects: [
                    "Keep building projects while applying"
                ],

                outcome:
                    `Become job-ready for ${career} opportunities.`,

                why:
                    `Your final goal is ${goal}, so applications begin once you have enough evidence of your skills.`
            }
        ],

        jobPreparation: {
            resume: `Create a one-page resume focused on ${career}.`,
            github: `Showcase your best projects related to ${interests}.`,
            linkedin: `Build a professional profile highlighting your journey toward ${career}.`,
            interviews: `Practice technical, project and HR questions for ${career}.`,
            applications: `Apply consistently for internships and entry-level ${career} roles.`
        },

        finalGoal: `🎯 Job Ready — ${career}`
    };

    res.json(roadmap);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});