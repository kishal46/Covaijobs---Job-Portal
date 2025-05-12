const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// NodeMailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

router.post('/hire', (req, res) => {
  const { name, jobTitle, companyName, email, phone, hearAbout } = req.body;

  if (!name || !jobTitle || !companyName || !email || !phone || !hearAbout) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Prepare the email content
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: 'kchannel022@gmail.com',
    subject: 'New Hire Request',
    text: `
      A new hiring request has been submitted:

      Name: ${name}
      Job Title: ${jobTitle}
      Company Name: ${companyName}
      Email: ${email}
      Phone: ${phone}
      How did they hear about us?: ${hearAbout}
    `,
    html: `
      <p>A new hiring request has been submitted:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Job Title:</strong> ${jobTitle}</li>
        <li><strong>Company Name:</strong> ${companyName}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>How did they hear about us?:</strong> ${hearAbout}</li>
      </ul>
    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email.' });
    }

    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Hire request sent successfully.' });
  });
});

module.exports = router;
