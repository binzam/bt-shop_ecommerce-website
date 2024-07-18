import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

const sendResetPasswordEmail = async (email, token) => {
  try {
    const templatePath = path.join(
      process.cwd(),
      'templates',
      'resetPassword.hbs'
    );
    const template = handlebars.compile(fs.readFileSync(templatePath, 'utf8'));

    const resetUrl = `http://localhost:5173/modal/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      // to: email,
      to: 'btechan@gmail.com',
      subject: 'Reset password for bt-shop',
      html: template({ resetUrl }),
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    return {
      success: false,
      message: 'Error sending email',
      error: error.message,
    };
  }
};

export default sendResetPasswordEmail;
