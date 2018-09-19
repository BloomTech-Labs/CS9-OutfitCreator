const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const port = process.env.PORT || 5000;

require('dotenv').config();

// set up server
const server = express();
const originUrl =
	process.env.NODE_ENV === 'production' ? `https://lambda-outfit-creator.herokuapp.com` : `http://localhost:3000`;
const corsOptions = {
	origin: originUrl,
	credentials: true,
	methods: [ 'GET', 'PUT', 'POST', 'DELETE' ],
	allowedHeaders: [ 'Content-Type', 'Authorization' ]
};

// set up middlewares
server.use(cors(corsOptions));
server.use(helmet());
server.use(express.urlencoded({ extended: false }));
server.use(morgan('dev'));
server.use(passport.initialize());
server.use(express.json());

const authRoutes = require('./routes/auth-routes');
const stripeRoutes = require('./routes/stripe-routes');
const userRoutes = require('./routes/user-routes');
const outfitRoutes = require('./routes/outfit-routes');
const itemRoutes = require('./routes/item-routes');

mongoose
	.connect(process.env.DB_URI, { useNewUrlParser: true })
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.log('Error connecting to the database');
	});

server.get('/', (req, res) => {
	res.status(200).json('Server running');
});

// set up routes
server.use('/auth', authRoutes);
server.use('/pay', stripeRoutes);
server.use('/user', userRoutes);
server.use('/items', itemRoutes);
server.use('/outfits', outfitRoutes);

// Catch-all error handler
server.use((err, req, res) => {
	res.status(500).send({ err });
});

// Start the server
server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
