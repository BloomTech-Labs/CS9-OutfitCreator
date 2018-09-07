module.exports = {
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
