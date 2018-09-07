module.exports = {
	google: {
		clientID: '841122416366-78bpv9nd7tp1q6q9irqtns0tcdome4cq.apps.googleusercontent.com',
		clientSecret: '072L_m5PUoiTTlz7TF2LswYj'
	},
	session: {
		cookieKey: 'topsecretrandomcookiephrase'
	},
	mongoDb: {
		dbURI: 'mongodb://user:password123@ds163630.mlab.com:63630/outfit-creator',
		dbURImul: 'mongodb://user:password123@ds163630.mlab.com:63630/outfit-creator'
	},
	stripe: {
		secretkey: 'sk_test_xj8MsjaHp54vM8zhfcWAZtDH'
	},
	ROOT_URL:
		process.env.NODE_ENV === 'production'
			? {
					WEB: 'https://lambda-outfit-creator.herokuapp.com',
					API: 'https://lambda-outfit-creator-api.herokuapp.com'
				}
			: {
					WEB: 'http://localhost:3000',
					API: 'http://localhost:5000'
				}
};
