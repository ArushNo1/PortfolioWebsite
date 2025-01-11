// src/app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    // Get the form data from the request
    const { name, email, message } = await req.json();

    // Create a Nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // You can use Gmail, SendGrid, etc.
      auth: {
        user: process.env.EMAIL_USER,  // Your email address (the sender)
        pass: process.env.EMAIL_PASSWORD,  // Your email password or App password (for Gmail)
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_USER,  // The email address sending the email (your email)
      to: process.env.RECIPIENT_EMAIL,  // Your email address where you want to receive the notification
      subject: `New message from ${name}`,  // Subject of the email
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,  // Body of the email
    };

    // Send the email
    const response = await transporter.sendMail(mailOptions);

    // Respond with success
    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
