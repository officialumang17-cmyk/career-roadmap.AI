import { useState } from "react";

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
    {
      key: "dreamJob",
      question: "What is your dream job?",
      placeholder: "Example: Software Engineer"
    },
    {
      key: "education",
      question: "What is your current education level?",
      placeholder: "Example: B.Tech 1st year"
    },
    {
      key: "experience",
      question: "What is your current experience level?",
      placeholder: "Example: Beginner"
    },
    {
      key: "skills",
      question: "What skills do you already have?",
      placeholder: "Example: Basic C and HTML"
    },
    {
      key: "interest",
      question: "What areas are you most interested in?",
      placeholder: "Example: AI, Web Development"
    },
    {
      key: "hours",
      question: "How much time can you study each day?",
      placeholder: "Example: 2 hours"
    },
    {
      key: "goal",
      question: "What is your main career goal?",
      placeholder: "Example: Get a software job"
    },
    {
      key: "learningStyle",
      question: "How do you prefer to learn?",
      placeholder: "Example: Projects and videos"
    },
    {
      key: "timeline",
      question: "When do you want to reach your career goal?",
      placeholder: "Example: 12 months"
    },
    {
      key: "challenge",
      question: "What is your biggest challenge right now?",
      placeholder: "Example: I don't know what to learn first"
    }
  ];

  const currentQuestion = questions[step];

 async function handleNext() {
    if (!answers[currentQuestion.key].trim()) return;

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          answers: answers
        })
      });

      const data = await response.json();

      console.log("Roadmap received:", data);
        setRoadmap(data);


    }
  }

  function handleChange(event) {
    setAnswers({
      ...answers,
      [currentQuestion.key]: event.target.value
    });
  }
    if (roadmap) {
        return (
            <div style={{ maxWidth: "700px", margin: "50px auto", padding: "20px" }}>
                <h1>{roadmap.career} Roadmap</h1>

                {roadmap.stages.map((stage) => (
                    <div key={stage.id}>
                        <h2>{stage.title}</h2>
                        <ul>
                            {stage.skills.map((skill) => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    }
  return (
      <div style={{ maxWidth: "700px", margin: "50px auto", padding: "20px" }}>
        <h1>CareerPath AI</h1>

        <p>
          Tell us about yourself and we'll build your personalized career roadmap.
        </p>

        <p>
          Question {step + 1} of {questions.length}
        </p>

        <h2>{currentQuestion.question}</h2>

        <input
            type="text"
            value={answers[currentQuestion.key]}
            onChange={handleChange}
            placeholder={currentQuestion.placeholder}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
        />

        <br />
        <br />

        <button onClick={handleNext}>
          {step === questions.length - 1 ? "Generate Roadmap" : "Next"}
        </button>
      </div>
  );
}

export default App;