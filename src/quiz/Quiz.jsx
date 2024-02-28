import React, { useState } from 'react';
import './Quiz.css';

const Quiz = () => {
  const questions = [
    {
      id: 1,
      question: 'Какая планета считается "Красной планетой"?',
      options: ['Венера', 'Марс', 'Юпитер', 'Сатурн'],
      correctAnswer: 'Марс',
    },
    {
      id: 2,
      question: 'Какое космическое тело является естественным спутником Земли?',
      options: ['Солнце', 'Луна', 'Марс', 'Венера'],
      correctAnswer: 'Луна',
    },
    {
      id: 3,
      question: 'Что такое астероиды?',
      options: ['Кометы', 'Маленькие планеты, крупнее метеоритов', 'Большие звезды', 'Спутники Юпитера'],
      correctAnswer: 'Маленькие планеты, крупнее метеоритов',
    },
    {
      id: 4,
      question: 'Какая планета считается "Газовым гигантом"?',
      options: ['Марс', 'Земля', 'Юпитер', 'Венера'],
      correctAnswer: 'Юпитер',
    },
    {
      id: 5,
      question: 'Как называется явление, когда светило исчезает за темным объектом, создавая светящийся круг?',
      options: ['Солнечное затмение', 'Лунное затмение', 'Солнечный ветер', 'Свечение'],
      correctAnswer: 'Солнечное затмение',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsAnswerCorrect(null); // Reset correctness on new selection
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;
    setIsAnswerCorrect(isCorrect);

    // Update score
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Move to the next question after a brief delay
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsAnswerCorrect(null);
      } else {
        // Quiz is finished
        setShowResult(true);
      }
    }, 1000); // Delay for 1 second before moving to the next question
  };

  return (
    <div>
      {showResult ? (
        <div>
          <h3>Ваш счет: {score}/{questions.length}</h3>
          {/* You can add additional elements or components here */}
        </div>
      ) : (
        <div>
          <h2>{questions[currentQuestion].question}</h2>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                style={{
                  cursor: 'pointer',
                  backgroundColor:
                    isAnswerCorrect && option === questions[currentQuestion].correctAnswer
                      ? 'green'
                      : selectedOption === option
                      ? 'gray'
                      : isAnswerCorrect === false && option === questions[currentQuestion].correctAnswer
                      ? 'green'
                      : isAnswerCorrect === false
                      ? 'red'
                      : 'white',
                }}
              >
                {option}
              </li>
            ))}
          </ul>
          <button onClick={handleNextQuestion} disabled={!selectedOption}>
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
