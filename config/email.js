const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationEmail = (email, token) => {
   // const url = `${process.env.CLIENT_URL}/verify/${token}`;
   const url = `http://localhost:3010/api/verify/${token}`;  // Ensure SERVER_URL is the backend server URL
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: `<h2>Please click the link below to verify your email</h2>
               <a href="${url}">${url}</a>`,
    };

    return transporter.sendMail(mailOptions);
};

const sendResetPasswordEmail = (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset OTP',
        html: `<h2>Your OTP for password reset is:</h2>
               <h3>${otp}</h3>
               <p>This OTP is valid for 10 minutes.</p>`,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {sendVerificationEmail , transporter , sendResetPasswordEmail };

