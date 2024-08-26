const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = new User({ username, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken({ id: user._id, role: user.role });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
