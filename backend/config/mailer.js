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

const generateSignupKey = () => {
    const buf = crypto.randomBytes(24);
    const created = Date.now();

    return {
        key: buf.toString('hex'),
        ts: created,
        exp: created + 86400000 //expiration of a day
    }
}

const sendEmail = (to, subject, html) => {
    return new Promise((resolve, reject) => {
      transport.sendMail({ from: 'Closet Roulette <closetroulette@gmail.com>', to, subject, html }, (err, info) => {
        if (err) reject(err);
        resolve(info);
      });
    });
  }

module.exports = { generateSignupKey, sendEmail };