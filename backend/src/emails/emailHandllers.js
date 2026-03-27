import nodemailer from 'nodemailer';
import { createWelcomeEmailTemplate } from './emailTemplate.js';
import dotenv from 'dotenv';

dotenv.config();

export async function sendWelcomeEmail(toEmail, name, clientURL) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Welcome to Messenger!',
    html: createWelcomeEmailTemplate(name, clientURL),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${toEmail}`);
  } catch (error) {
    console.error(`Error sending welcome email to ${toEmail}:`, error);
  }
}