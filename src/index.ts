import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const emailRecipients = [
{ name: 'John Doe', email: ''},
];
const sendEmail = async (name: string, email: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Test Email',
    text: `Hi ${name},

I hope this email finds you well.

`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
  }
};

const sendEmailsWithDelay = async (
  recipients: { name: string; email: string }[],
  delay: number
) => {
  for (const recipient of recipients) {
    console.log(`Sending email to ${recipient.name} (${recipient.email})...`);
    await sendEmail(recipient.name, recipient.email);

    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};
sendEmailsWithDelay(emailRecipients, 3000)
  .then(() => {
    console.log('All emails sent successfully');
  })
  .catch((error) => {
    console.error('Error sending emails:', error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
