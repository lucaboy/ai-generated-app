import React, { useState, useEffect } from 'react';
import api from '../axiosConfig';
import ResultsTable from './ResultsTable';

const InstructorDashboard = () => {
  const [examTitle, setExamTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await api.get('/instructor/view-results');
        setResults(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, []);

  const handleCreateExam = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/instructor/create-exam', { title: examTitle, startTime, endTime });
      alert('Exam created successfully!');
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadQuestions = async (e) => {
    e.preventDefault();
    try {
      const examId = prompt("Enter the Exam ID:");
      await api.post('/instructor/upload-questions', { examId, questions });
      alert('Questions uploaded successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Instructor Dashboard</h2>
      <form onSubmit={handleCreateExam}>
        <div className="mb-3">
          <label htmlFor="examTitle" className="form-label">Exam Title</label>
          <input type="text" className="form-control" id="examTitle" value={examTitle} onChange={(e) => setExamTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="startTime" className="form-label">Start Time</label>
          <input type="datetime-local" className="form-control" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="endTime" className="form-label">End Time</label>
          <input type="datetime-local" className="form-control" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Create Exam</button>
      </form>

      <h3 className="mt-5">Upload Questions</h3>
      <form onSubmit={handleUploadQuestions}>
        <div className="mb-3">
          <label htmlFor="questions" className="form-label">Questions (JSON Format)</label>
          <textarea className="form-control" id="questions" rows="5" value={questions} onChange={(e) => setQuestions(JSON.parse(e.target.value))}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Upload Questions</button>
      </form>

      <h3 className="mt-5">Results</h3>
      <ResultsTable results={results} />
    </div>
  );
};

export default InstructorDashboard;
