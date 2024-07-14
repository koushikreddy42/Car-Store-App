const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

function sendVerificationEmail(userEmail, verificationToken) {
  const config = {
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  };

  const transporter = nodemailer.createTransport(config);

  const MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: 'https://mailgen.js/'
    }
  });

  const verificationLink = `https://car-store-app-api.vercel.app/api/verify-email?token=${verificationToken}`;
  const response = {
    body: {
      name: 'Car Store',
      intro: 'Verify your email',
      action: {
        instructions: 'Click the button below to verify your email:',
        button: {
          color: '#22BC66',
          text: 'Verify Email',
          link: verificationLink
        }
      },
      outro: 'This link will expire in 24 hours.'
    }
  };

  const mail = MailGenerator.generate(response);
  const message = {
    from: process.env.GMAIL_USER,
    to: userEmail,
    subject: 'Verify your email',
    html: mail
  };
  transporter.sendMail(message)
}

function sendPasswordResetEmail(userEmail, resetLink) {
  const config = {
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  };

  const transporter = nodemailer.createTransport(config);

  const MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: 'https://mailgen.js/'
    }
  });

  const response = {
    body: {
      name: 'Car Store',
      intro: 'Password Reset Request',
      action: {
        instructions: 'Click the button below to reset your password:',
        button: {
          color: '#DC4D2F',
          text: 'Reset Password',
          link: resetLink
        }
      },
      outro: 'This link will expire in 1 hour.'
    }
  };
  const mail = MailGenerator.generate(response);
  const message = {
    from: process.env.GMAIL_USER,
    to: userEmail,
    subject: 'Verify your email',
    html: mail
  };
  transporter.sendMail(message)
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
