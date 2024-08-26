const express = require('express');
const { createExam, uploadQuestions, viewResults } = require('../controllers/instructorController');
const { authenticateInstructor } = require('../utils/jwt');

const router = express.Router();

router.post('/create-exam', authenticateInstructor, createExam);
router.post('/upload-questions', authenticateInstructor, uploadQuestions);
router.get('/view-results', authenticateInstructor, viewResults);

module.exports = router;
