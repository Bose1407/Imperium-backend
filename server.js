
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    origin: "https://team-imperium.netlify.app",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other email service
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email password or app password
  },
});

// Basic health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Contact form API is running!' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    console.log('Missing required fields');
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }
  
  try {
    // Email content
    const mailOptions = {
      from: email,
      to: process.env.RECIPIENT_EMAIL, // recipient's email (website owner)
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333; text-align: center;">📩 New Contact Form Submission</h2>
        <hr style="border: 1px solid #ddd;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #007bff; margin: 10px 0;">
          ${message}
        </blockquote>
        <hr style="border: 1px solid #ddd;">
        <p style="text-align: center; font-size: 14px; color: #888;">This email was sent from your website contact form.</p>
      </div>
    </div>
  `,
    };

    
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    
    res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
