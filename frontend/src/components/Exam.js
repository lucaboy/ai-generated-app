import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axiosConfig';

const Exam = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(1800); // 30 minutes in seconds
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await api.get('/exam');
        setQuestions(response.data.questions);
        setAnswers(new Array(response.data.questions.length).fill(null));
      } catch (err) {
        console.error(err);
      }
    };
    fetchExam();
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    if (timer <= 0) {
      clearInterval(countdown);
      handleSubmit();
    }

    return () => clearInterval(countdown);
  }, [timer]);

  const handleAnswerChange = (index, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[index] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post('/exam/submit', { answers });
      setSubmitted(true);
      alert(`Exam submitted! Your score: ${response.data.score}`);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (submitted) {
    return <h2>Exam submitted successfully!</h2>;
  }

  return (
    <div className="container">
      <h2>Exam</h2>
      <p>Time remaining: {Math.floor(timer / 60)}:{timer % 60}</p>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} className="mb-3">
            <p>{question.questionText}</p>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="form-check">
                <input className="form-check-input" type="radio" name={`question-${index}`} id={`question-${index}-option-${optionIndex}`} value={optionIndex}
                  checked={answers[index] === optionIndex} onChange={() => handleAnswerChange(index, optionIndex)} />
                <label className="form-check-label" htmlFor={`question-${index}-option-${optionIndex}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Submit Exam</button>
      </form>
    </div>
  );
};

export default Exam;
