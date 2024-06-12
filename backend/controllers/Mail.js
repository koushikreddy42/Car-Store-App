const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

function sendVerificationEmail(userEmail, verificationToken) {
  const config = {
    service: 'gmail',
    auth: {
      user: 'alien64209@gmail.com',
      pass: 'taisozlosyymbjiu'
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

  const verificationLink = `http://localhost:8080/api/verify-email?token=${verificationToken}`;
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
    from: 'alien64209@gmail.com',
    to: userEmail,
    subject: 'Verify your email',
    html: mail
  };
  transporter.sendMail(message)
}

module.exports = sendVerificationEmail;