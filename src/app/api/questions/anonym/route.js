import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import axios from 'axios';

// Definování POST handleru pro anonymní dotazy
export async function POST(req) {
  const { email, question, recaptchaToken } = await req.json();

  // Ověření reCAPTCHA tokenu
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

  try {
    // Ověření reCAPTCHA
    const verificationResponse = await axios.post(verificationUrl);
    const { success } = verificationResponse.data;

    if (!success) {
      return NextResponse.json({ success: false, message: 'Ověření reCAPTCHA selhalo.' }, { status: 400 });
    }

    // Nodemailer konfigurace pro Seznam.cz SMTP server
    const transporter = nodemailer.createTransport({
      host: 'smtp.seznam.cz', // SMTP server Seznam.cz
      port: 465, // Používáme SSL
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // Tvůj Seznam.cz e-mail
        pass: process.env.EMAIL_PASS, // Heslo k e-mailu
      },
    });

    // Odeslání e-mailu
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Tvůj e-mail na Seznam.cz
      to: 'anonymodpovedi@email.cz', // E-mail majitele
      subject: 'Nový anonymní dotaz',
      text: `Anonymní dotaz:\n\n${question}\n\nKontakt: ${email}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email or verifying reCAPTCHA:', error);
    return NextResponse.json({ success: false, message: 'Chyba při odesílání e-mailu.' }, { status: 500 });
  }
}
