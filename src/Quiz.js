import React, { useState } from 'react';
import quizData from './quizData';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(""); 
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerOptionClick = (option) => {
    const correctAnswer = quizData[currentQuestion].answer;
    setSelectedAnswer(option);
    if (option === correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    // Delay moving to the next question to allow the user to see feedback
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
        setIsCorrect(null); // Reset for the next question
        setSelectedAnswer(""); // Reset selected answer
      } else {
        setShowScore(true);
      }
    }, 1000); // Adjust time as needed
  };

  return (
    <div className='quiz'>
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {quizData.length}
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{quizData.length}
            </div>
            <div className='question-text'>{quizData[currentQuestion].question}</div>
          </div>
          <div className='answer-section'>
            {quizData[currentQuestion].options.map((option) => (
              <button 
  onClick={() => handleAnswerOptionClick(option)} 
  key={option}
  style={{ 
    backgroundColor: selectedAnswer === option ? (isCorrect ? 'lightgreen' : 'pink') : '#f0f0f0', /* Default background color */
    color: selectedAnswer === option ? 'black' : '#333', /* Text color */
    padding: '10px 20px', /* Padding for better spacing */
    margin: '10px', /* Margin for spacing between buttons */
    border: 'none', /* Remove border */
    borderRadius: '5px', /* Rounded corners */
    cursor: 'pointer', /* Pointer cursor on hover */
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', /* Add shadow */
    transition: 'background-color 0.3s ease, transform 0.2s ease' /* Smooth transition */
  }}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = selectedAnswer === option ? (isCorrect ? 'lightgreen' : 'pink') : '#e0e0e0'; /* Hover background color */
    e.target.style.transform = 'scale(1.05)'; /* Slightly enlarge on hover */
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = selectedAnswer === option ? (isCorrect ? 'lightgreen' : 'pink') : '#f0f0f0'; /* Original background color */
    e.target.style.transform = 'scale(1)'; /* Reset size */
  }}
>
  {option}
</button>

            ))}
          </div>
{selectedAnswer && (
  <div 
    style={{ 
      marginTop: '10px', 
      padding: '10px', 
      borderRadius: '5px', 
      backgroundColor: isCorrect ? 'lightgreen' : 'lightcoral', 
      color: 'white', 
      fontWeight: 'bold', 
      textAlign: 'center', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
      transition: 'transform 0.2s ease' 
    }}
  >
    {isCorrect ? 'Correct! 🎉' : 'Sorry, that’s not right. 😢'}
  </div>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;
