import React, { useState, useEffect } from 'react';
import sampleQuestions from '../questions';


const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [timer, setTimer] = useState(30);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    if (timer === 0) handleNext();
    return () => clearInterval(interval);
  }, [timer]);

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
    setFeedback(
      option === sampleQuestions[currentQuestion].answer
        ? 'Correct!'
        : 'Wrong answer!'
    );
    if (option === sampleQuestions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmitAnswer = () => {
    setFeedback(
      userInput.toLowerCase() === sampleQuestions[currentQuestion].answer.toLowerCase()
        ? 'Correct!'
        : 'Wrong answer!'
    );
    if (userInput.toLowerCase() === sampleQuestions[currentQuestion].answer.toLowerCase()) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer('');
    setFeedback('');
    setTimer(30);
    setUserInput('');
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      alert(`Quiz completed! Your score: ${score}/${sampleQuestions.length}`);
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  return (
    <div className='p-4 rounded-2xl shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] w-[calc(80%)] mx-auto mt-4'>
      <div className='mb-4 border rounded-lg p-4 shadow-lg'>

        <h2 className='text-xl mb-2'>
          {`Q.${currentQuestion + 1} : `}
          {sampleQuestions[currentQuestion].question}
        </h2>

        
        {sampleQuestions[currentQuestion].options.length > 0 ? (
          <div className='grid grid-cols-2 gap-2'>
            {sampleQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`p-2 rounded ${selectedAnswer === option ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className='mt-2 flex flex-col items-center'>
            <input
              type='text'
              value={userInput}
              onChange={handleInputChange}
              className='border p-2 rounded w-full'
            />
            <button onClick={handleSubmitAnswer} className='mt-2 p-2 bg-blue-500 text-white rounded'>Submit</button>
          </div>
        )}


        <p className='mt-2'>Timer: {timer}s</p>
        <p className='mt-2'>{feedback}</p>

        <button onClick={handleNext} className='mt-4 p-2 bg-green-500 text-white rounded'>
          Next
        </button>

      </div>

      <div className='mt-4 border rounded-lg p-4 shadow-lg w-full max-w-md bg-green-100'>
        <h3 className='text-lg font-bold'>Progress</h3>
        <p>Current Score: {score} / {sampleQuestions.length}</p>
        <p>Question {currentQuestion + 1} of {sampleQuestions.length}</p>
      </div>

    </div>
  );
};

export default QuizApp;
