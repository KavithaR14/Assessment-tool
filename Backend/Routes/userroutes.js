const express = require("express");
const { 
  sendOtp, 
  verifyOtp, 
  signin, 
  // sendAssessmentReport 
} = require("../Controllers/userController");

const router = express.Router();

// Auth routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/signin", signin);

// Assessment report route
// router.post("/send-assessment-report", sendAssessmentReport);

module.exports = router;