const Exam = require('../models/Exam');
const Question = require('../models/Question');
const User = require('../models/User');
const { sendEmail } = require('../utils/email');

exports.getExam = async (req, res) => {
  try {
    const exam = await Exam.findOne().populate('questions');
    res.json(exam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.submitExam = async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (user.examAttempted) {
      return res.status(403).json({ error: 'You have already taken the exam' });
    }

    const exam = await Exam.findOne().populate('questions');
    let score = 0;

    exam.questions.forEach((question, index) => {
      if (question.correctOption === answers[index]) {
        score++;
      }
    });

    user.examAttempted = true;
    user.score = score;
    user.submissionTime = new Date();
    await user.save();

    sendEmail(user.email, 'Your Exam Score', `You scored ${score} out of 30.`);

    res.json({ score });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
