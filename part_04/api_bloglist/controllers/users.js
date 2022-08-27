const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

usersRouter.post('/', async (request, response, next) => {
	const body = request.body;
	if (body.password.length < 3) {
		return response.status(400).json({ error: `User validation failed: username: Path \`password\` (\`${body.password}\`) is shorter than the minimum allowed length (3)` })
	}
	try {
		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(body.password, saltRounds);
	
		const user = new User({
			username: body.username,
			name: body.name,
			passwordHash,
		});
	
		const savedUser = await user.save();
	
		response.json(savedUser);		
	} catch (error) {
		if (error.name === 'ValidationError') {
			return response.status(400).json({ error: error.message });		
		} else {
			next(error);
		}
	}
});

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
    response.json(users.map(user => user.toJSON()));
});

module.exports = usersRouter;