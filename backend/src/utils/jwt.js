const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

exports.generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
};

exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

exports.authenticateInstructor = (req, res, next) => {
  this.authenticate(req, res, () => {
    if (req.user.role !== 'instructor') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  });
};
