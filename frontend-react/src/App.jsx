import { useState } from "react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

function App() {
    const [step, setStep] = useState(0);
    const [roadmap, setRoadmap] = useState(null);

    const [answers, setAnswers] = useState({
        dreamJob: "",
        education: "",
        experience: "",
        skills: "",
        interest: "",
        hours: "",
        goal: "",
        learningStyle: "",
        timeline: "",
        challenge: ""
    });

    const questions = [
        ["dreamJob", "What is your dream job?", "Example: Software Engineer"],
        ["education", "What is your current education level?", "Example: B.Tech 1st year"],
        ["experience", "What is your current experience level?", "Example: Beginner"],
        ["skills", "What skills do you already have?", "Example: Basic C and HTML"],
        ["interest", "What areas are you most interested in?", "Example: AI, Web Development"],
        ["hours", "How much time can you study each day?", "Example: 2 hours"],
        ["goal", "What is your main career goal?", "Example: Get a software job"],
        ["learningStyle", "How do you prefer to learn?", "Example: Projects and videos"],
        ["timeline", "When do you want to reach your career goal?", "Example: 12 months"],
        ["challenge", "What is your biggest challenge right now?", "Example: I don't know what to learn first"]
    ];

    const currentQuestion = questions[step];

    async function handleNext() {
        if (!answers[currentQuestion[0]].trim()) return;

        if (step < questions.length - 1) {
            setStep(step + 1);
            return;
        }

        try {

            const response = await fetch("https://career-roadmap-ai-vq6a.onrender.com/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers })
            });

            const data = await response.json();
            setRoadmap(data);
        } catch (error) {
            alert("Unable to connect to CareerPath AI backend.");
        }
    }

    function handleChange(e) {
        setAnswers({
            ...answers,
            [currentQuestion[0]]: e.target.value
        });
    }

    const pageStyle = {
        minHeight: "100vh",
        padding: "50px 20px",
        color: "#f8fafc",
        fontFamily: "Arial, sans-serif",
        background:
            "radial-gradient(circle at 15% 20%, rgba(99,102,241,.28), transparent 25%), radial-gradient(circle at 85% 75%, rgba(168,85,247,.22), transparent 28%), radial-gradient(circle at 50% 100%, rgba(14,165,233,.15), transparent 30%), #020617",
        position: "relative",
        overflow: "hidden"
    };

    const cardStyle = {
        background: "rgba(15,23,42,.82)",
        border: "1px solid rgba(148,163,184,.2)",
        boxShadow: "0 20px 60px rgba(0,0,0,.45)",
        backdropFilter: "blur(16px)",
        borderRadius: "22px"
    };

    if (roadmap) {
        const nodes = roadmap.stages.map((stage, index) => ({
            id: stage.id,
            position: {
                x: index % 2 === 0 ? 50 : 450,
                y: Math.floor(index / 2) * 220
            },
            data: { label: stage.title },
            style: {
                padding: "16px",
                borderRadius: "14px",
                border: "1px solid #818cf8",
                background: "#111827",
                color: "#f8fafc",
                width: 280,
                fontWeight: "600",
                boxShadow: "0 0 20px rgba(99,102,241,.25)"
            }
        }));

        const edges = roadmap.stages.slice(1).map((stage, index) => ({
            id: `edge-${index}`,
            source: roadmap.stages[index].id,
            target: stage.id,
            animated: true
        }));

        return (
            <div style={pageStyle}>
                <div style={{ maxWidth: "1050px", margin: "auto" }}>
                    <h1 style={{
                        textAlign: "center",
                        fontSize: "42px",
                        marginBottom: "10px",
                        textShadow: "0 0 25px rgba(129,140,248,.7)"
                    }}>
                        🚀 {roadmap.career} Roadmap
                    </h1>

                    <p style={{
                        textAlign: "center",
                        color: "#cbd5e1",
                        maxWidth: "850px",
                        margin: "15px auto 30px",
                        lineHeight: "1.7"
                    }}>
                        {roadmap.summary}
                    </p>

                    <div style={{
                        ...cardStyle,
                        height: "500px",
                        marginBottom: "30px"
                    }}>
                        <ReactFlow nodes={nodes} edges={edges} fitView>
                            <Background color="#334155" gap={25} />
                            <Controls />
                        </ReactFlow>
                    </div>

                    {roadmap.stages.map(stage => (
                        <div key={stage.id} style={{
                            ...cardStyle,
                            padding: "25px",
                            marginBottom: "20px"
                        }}>
                            <h2 style={{ color: "#a5b4fc" }}>{stage.title}</h2>

                            <p><strong>⏱ Duration:</strong> {stage.duration}</p>
                            <p><strong>💡 Why:</strong> {stage.why}</p>

                            <h3>📚 Learn</h3>
                            <ul>
                                {stage.learn.map(item => <li key={item}>{item}</li>)}
                            </ul>

                            <h3>💪 Practice</h3>
                            <ul>
                                {stage.practice.map(item => <li key={item}>{item}</li>)}
                            </ul>

                            <h3>🚀 Projects</h3>
                            <ul>
                                {stage.projects.map(item => <li key={item}>{item}</li>)}
                            </ul>

                            <p><strong>🎯 Outcome:</strong> {stage.outcome}</p>
                        </div>
                    ))}

                    <div style={{
                        ...cardStyle,
                        padding: "25px",
                        marginTop: "25px"
                    }}>
                        <h2 style={{ color: "#a5b4fc" }}>🎯 Job Preparation</h2>
                        <p><strong>Resume:</strong> {roadmap.jobPreparation.resume}</p>
                        <p><strong>GitHub:</strong> {roadmap.jobPreparation.github}</p>
                        <p><strong>LinkedIn:</strong> {roadmap.jobPreparation.linkedin}</p>
                        <p><strong>Interviews:</strong> {roadmap.jobPreparation.interviews}</p>
                        <p><strong>Applications:</strong> {roadmap.jobPreparation.applications}</p>
                    </div>

                    <h2 style={{
                        textAlign: "center",
                        marginTop: "35px",
                        color: "#c4b5fd"
                    }}>
                        {roadmap.finalGoal}
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div style={pageStyle}>
            <div style={{
                position: "fixed",
                top: "8%",
                left: "8%",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 30%, #fde68a, #f97316 45%, #7c2d12)",
                boxShadow: "0 0 70px rgba(249,115,22,.35)",
                opacity: .8
            }} />

            <div style={{
                position: "fixed",
                bottom: "8%",
                right: "7%",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 30%, #c4b5fd, #6366f1 50%, #312e81)",
                boxShadow: "0 0 60px rgba(99,102,241,.45)",
                opacity: .75
            }} />

            <div style={{
                ...cardStyle,
                maxWidth: "720px",
                margin: "40px auto",
                padding: "42px"
            }}>
                <div style={{
                    textAlign: "center",
                    fontSize: "13px",
                    color: "#818cf8",
                    letterSpacing: "3px",
                    marginBottom: "12px"
                }}>
                    AI • CAREER • FUTURE
                </div>

                <h1 style={{
                    textAlign: "center",
                    fontSize: "48px",
                    margin: "0 0 10px",
                    background: "linear-gradient(90deg,#a5b4fc,#c4b5fd,#67e8f9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}>
                    🚀 CareerPath AI
                </h1>

                <p style={{
                    textAlign: "center",
                    color: "#cbd5e1",
                    fontSize: "17px",
                    lineHeight: "1.6"
                }}>
                    Navigate your career journey from where you are
                    to where you want to be.
                </p>

                <div style={{
                    height: "6px",
                    background: "#1e293b",
                    borderRadius: "10px",
                    margin: "30px 0"
                }}>
                    <div style={{
                        width: `${((step + 1) / questions.length) * 100}%`,
                        height: "100%",
                        borderRadius: "10px",
                        background: "linear-gradient(90deg,#6366f1,#a855f7,#06b6d4)"
                    }} />
                </div>

                <p style={{
                    color: "#818cf8",
                    fontWeight: "600"
                }}>
                    QUESTION {step + 1} / {questions.length}
                </p>

                <h2 style={{
                    fontSize: "27px",
                    lineHeight: "1.4",
                    color: "#f8fafc"
                }}>
                    {currentQuestion[1]}
                </h2>

                <input
                    value={answers[currentQuestion[0]]}
                    onChange={handleChange}
                    onKeyDown={e => {
                        if (e.key === "Enter") handleNext();
                    }}
                    placeholder={currentQuestion[2]}
                    style={{
                        width: "100%",
                        padding: "17px",
                        fontSize: "16px",
                        borderRadius: "12px",
                        border: "1px solid #475569",
                        background: "#020617",
                        color: "#f8fafc",
                        outline: "none"
                    }}
                />

                <button
                    onClick={handleNext}
                    style={{
                        width: "100%",
                        marginTop: "20px",
                        padding: "16px",
                        border: "none",
                        borderRadius: "12px",
                        background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
                        color: "white",
                        fontSize: "17px",
                        fontWeight: "700",
                        cursor: "pointer",
                        boxShadow: "0 10px 30px rgba(99,102,241,.3)"
                    }}
                >
                    {step === questions.length - 1
                        ? "🚀 Generate My Roadmap"
                        : "Continue →"}
                </button>

                <p style={{
                    textAlign: "center",
                    color: "#64748b",
                    fontSize: "13px",
                    marginTop: "20px"
                }}>
                    Your answers shape your personalized career path.
                </p>
            </div>
        </div>
    );
}

export default App;