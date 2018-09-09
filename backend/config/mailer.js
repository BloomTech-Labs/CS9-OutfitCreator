const crypto = require('crypto');
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

const transport = nodemailer.createTransport(
	nodemailerSendgrid({
		apiKey: process.env.SENDGRID_API_KEY
	})
);

const generateSignupKey = () => {
	const buf = crypto.randomBytes(24);
	const created = Date.now();

	return {
		key: buf.toString('hex'),
		ts: created,
		exp: created + 86400000 //expiration of a day
	};
};

const sendEmail = (to, subject, html) => {
	return new Promise((resolve, reject) => {
		transport.sendMail({ from: 'Closet Roulette <closetroulette@gmail.com>', to, subject, html }, (err, info) => {
			if (err) reject(err);
			resolve(info);
		});
	});
};

module.exports = { generateSignupKey, sendEmail };
