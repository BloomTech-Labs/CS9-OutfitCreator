const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');

// Configure transport options -- for production
// const mailgunOptions = {
//     auth: {
//         api_key: process.env.MAILGUN_USER,
//         domain: process.env.MAILGUN_PASS
//     }
// }
// const transport = mailgunTransport(mailgunOptions);
// const emailClient = nodemailer.createTransport(transport);

const transport = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
});



const sendEmail = (to, subject, html, text) => {
    return new Promise((resolve, reject) => {
      transport.sendMail({ from: 'outfitcreator', to, subject, html, text }, (err, info) => {
        if (err) reject(err);
        resolve(info);
      });
    });
  }

module.exports = { generateSignupKey, sendEmail };