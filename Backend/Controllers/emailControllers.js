const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to generate PDF report
const generatePDF = (userName, sectionScores, sectionDescriptions, chartImage) => {
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, "Assessment_Report.pdf");

  doc.pipe(fs.createWriteStream(filePath));

  // Main Heading
  doc
    .fontSize(20)
    .fillColor("#007BFF") // Blue color for the main heading
    .text("Assessment Report", { align: "center" })
    .moveDown();

  // User Greeting
  doc
    .fontSize(14)
    .fillColor("#000000") // Black color for normal text
    .text(`Hello ${userName},`, { align: "left" })
    .moveDown();

  doc
    .fontSize(12)
    .text("Here is your assessment report:", { align: "left" })
    .moveDown(2);

  // Section 1
  doc
    .fontSize(14)
    .fillColor("#FF6384") // Green color for subheadings
    .text("Section 1: Job Satisfaction & Support");
  doc
    .fontSize(10)
    .fillColor("#000000")
    .text(`Score: ${sectionScores.section1Score}/40`);
  doc.text(`Analysis: ${sectionDescriptions.section1Description}`).moveDown();

  // Section 2
  doc
    .fontSize(14)
    .fillColor("#36A2EB" ) // Green color for subheadings
    .text("Section 2: Stress Management & Workload");
  doc
    .fontSize(10)
    .fillColor("#000000")
    .text(`Score: ${sectionScores.section2Score}/40`);
  doc.text(`Analysis: ${sectionDescriptions.section2Description}`).moveDown();

  // Section 3
  doc
    .fontSize(14)
    .fillColor("#FFCE56") // Green color for subheadings
    .text("Section 3: Professional Development & Collaboration");
  doc
    .fontSize(10)
    .fillColor("#000000")
    .text(`Score: ${sectionScores.section3Score}/40`);
  doc.text(`Analysis: ${sectionDescriptions.section3Description}`).moveDown();

  // Section 4
  doc
    .fontSize(14)
    .fillColor( "#4BC0C0") // Green color for subheadings
    .text("Section 4: Workplace Environment & Emotional Well-being");
  doc
    .fontSize(10)
    .fillColor("#000000")
    .text(`Score: ${sectionScores.section4Score}/40`);
  doc.text(`Analysis: ${sectionDescriptions.section4Description}`).moveDown();

  // Chart Image
  if (chartImage) {
    const base64Image = chartImage.replace(/^data:image\/png;base64,/, "");
    const chartBuffer = Buffer.from(base64Image, "base64");
    doc.image(chartBuffer, { width: 300, align: "center" }).moveDown();
  }

  doc.end();
  return filePath;
};


// Send report controller function
const sendReport = async (req, res) => {
  try {
    const { userEmail, userName, sectionScores, sectionDescriptions, chartImage } = req.body;

    if (!userEmail || !userName || !sectionScores || !sectionDescriptions || !chartImage) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Generate PDF report
    const pdfPath = generatePDF(userName, sectionScores, sectionDescriptions, chartImage);

    // Configure email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Your Assessment Report",
      text: "Please find your assessment report attached.",
      attachments: [
        {
          filename: "Assessment_Report.pdf",
          path: pdfPath,
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Remove the generated PDF after sending
    fs.unlinkSync(pdfPath);

    res.status(200).json({ message: "Email with PDF sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email", error: error.message });
  }
};

module.exports = { sendReport };
