const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "kavitha31032002@gmail.com",
    pass: "yrspkptqfaxfvqwo",
  },
  logger: true,
  debug: true,
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error('Transporter verification failed:', error);
  } else {
    console.log('Transporter is ready to send emails');
  }
});

module.exports = transporter;