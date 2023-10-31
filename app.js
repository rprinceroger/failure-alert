const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

const port = process.env.PORT || 3000;

const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());

app.post('/error', (req, res) => {
  const errorData = req.body;

  // Process error data and generate an email message
  const emailMessage = `An error occurred: ${errorData.message}`;

  // Send email alert
  sendEmail(emailMessage);

  res.send('Error received and alert sent.');
});

// Send email function
function sendEmail(message) {
	const transporter = nodemailer.createTransport({
	  service: 'Gmail',
	  auth: {
	    user: process.env.Email,
	    pass: process.env.PW
	  },
	  tls: {
	    rejectUnauthorized: false // Allow self-signed certificates
	  }
	});

  const mailOptions = {
    from: process.env.Email, // Sender's email address
    to: process.env.RecipientEmail, // Recipient's email address
    subject: 'Error Alert',
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
