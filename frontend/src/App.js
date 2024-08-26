import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Exam from './components/Exam';
import InstructorDashboard from './components/InstructorDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/exam" element={<Exam/>} />
        <Route path="/instructor" element={<InstructorDashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;
