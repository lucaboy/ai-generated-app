const User = require('../models/User');
const Exam = require('../models/Exam');
const Question = require('../models/Question');

exports.createExam = async (req, res) => {
  try {
    const { title, startTime, endTime } = req.body;
    const exam = new Exam({ title, startTime, endTime });
    await exam.save();
    res.status(201).json({ message: 'Exam created successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.uploadQuestions = async (req, res) => {
  try {
    const { examId, questions } = req.body; // questions should be an array of { questionText, options, correctOption }

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    const createdQuestions = await Question.insertMany(
      questions.map(q => ({ ...q, examId }))
    );

    exam.questions.push(...createdQuestions.map(q => q._id));
    await exam.save();

    res.json({ message: 'Questions uploaded successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.viewResults = async (req, res) => {
  try {
    const users = await User.find({ role: 'student' }).select('username email score submissionTime');
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
