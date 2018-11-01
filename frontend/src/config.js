module.exports = {
	ROOT_URL:
		process.env.REACT_APP_NODE_ENV === 'production'
			? {
					WEB: 'https://closetroulette.com',
					API: 'https://lambda-outfit-creator-api.herokuapp.com'
				}
			: {
					WEB: 'http://localhost:3000',
					API: 'http://localhost:5000'
				}
};
