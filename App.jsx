import React, { useState, useEffect } from "react";
import "./App.css";

const questions = [
  {
    question: "Which language is used for React?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript"
  },
  {
    question: "What hook is used for state in React?",
    options: ["useData", "useState", "useEffect", "useHook"],
    answer: "useState"
  },
  {
    question: "React is developed by?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
    answer: "Facebook"
  },
  {
    question: "What is React",
    options: ["Python Library", "Java Library", "JavaScript Library", "C++ Library"],
    answer: "JavaScript Library"
  },
  {
    question: "What is the main building blocks of React?",
    options: ["Function", "Variable", "Components", "Classes"],
    answer: "Components"
  },
  {
    question: "How is Data passed from parent to child component in React?",
    options: ["State", "Props", "Hooks", "Events"],
    answer: "Props"
  },
  {
    question: "React Components must start with :",
    options: ["A number", "A lowercase letter", "An uppercase letter", "A special character"],
    answer: "An uppercase letter"
  },
  {
    question: "Which hook is used to access DOM elements directly?",
    options: ["useState", "useEffect", "useRef", "useContext"],
    answer: "useRef"
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (showScore) return;

    if (timer === 0) {
      handleNext();
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleAnswerClick = (option) => {
    if (selectedAnswer) return; // prevent multiple clicks

    setSelectedAnswer(option);

    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setTimer(10);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
    setSelectedAnswer(null);
  };

  return (
    <div className="quiz-container">
      <h1>React Quiz App</h1>

      {showScore ? (
        <div className="score-section">
          <h2>Your Score: {score} / {questions.length}</h2>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div className="question-section">
          <h2>
            Question {currentQuestion + 1} / {questions.length}
          </h2>

          <div className={`timer ${timer <= 3 ? "danger" : ""}`}>
            ⏱ {timer}s
          </div>

          <p>{questions[currentQuestion].question}</p>

          <div className="options">
            {questions[currentQuestion].options.map((option, index) => {
              let buttonClass = "";

              if (selectedAnswer) {
                if (option === questions[currentQuestion].answer) {
                  buttonClass = "correct";
                } else if (option === selectedAnswer) {
                  buttonClass = "wrong";
                }
              }

              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => handleAnswerClick(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selectedAnswer && (
            <button className="next-btn" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;