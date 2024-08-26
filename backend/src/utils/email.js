const nodemailer = require('nodemailer');
const { smtpHost, smtpPort, emailUser, emailPass } = require('../config');

const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

exports.sendEmail = (to, subject, text) => {
  return transporter.sendMail({
    from: emailUser,
    to,
    subject,
    text
  });
};
