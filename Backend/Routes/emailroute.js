const express = require('express');
const router = express.Router();
const emailController = require('../Controllers/emailControllers');

// Route to send email after assessment completion
router.post('/send-report', emailController.sendReport);

module.exports = router;
