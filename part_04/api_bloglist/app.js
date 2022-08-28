const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const url = config.MONGODB_URI;

logger.info('connecting to', url);

mongoose
	.connect(url,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	.then(result => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.info('error connecting to MongoDB:', error.message);
	});

app.use(cors());

app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);

app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogsRouter);

app.use(middleware.tokenValidator);

app.use(middleware.errorHandler);

module.exports = app;