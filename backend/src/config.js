require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS
};
