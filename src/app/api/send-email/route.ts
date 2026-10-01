// src/app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-IP limit. In-memory, so it resets on cold starts and isn't
// shared across serverless instances, but it stops casual spam.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

interface ContactBody {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown; // honeypot: real users never fill this in
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
    if (rateLimited(ip)) {
      return NextResponse.json({ success: false, error: 'Too many messages' }, { status: 429 });
    }

    const body: ContactBody = await req.json();

    // Bots fill every field. Pretend it worked and send nothing.
    if (typeof body.company === 'string' && body.company.length > 0) {
      return NextResponse.json({ success: true });
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (
      !email ||
      !message ||
      name.length > MAX_NAME ||
      email.length > MAX_EMAIL ||
      message.length > MAX_MESSAGE ||
      !EMAIL_RE.test(email)
    ) {
      return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New message from ${name || email}`,
      text: `Name: ${name || '(none)'}\nEmail: ${email}\nMessage: ${message}`,
    });

    // Never return the Nodemailer response: it includes the recipient address.
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
