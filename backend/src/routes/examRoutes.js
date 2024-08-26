const express = require('express');
const { getExam, submitExam } = require('../controllers/examController');
const { authenticate } = require('../utils/jwt');

const router = express.Router();

router.get('/', authenticate, getExam);
router.post('/submit', authenticate, submitExam);

module.exports = router;
