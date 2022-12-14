const blogsRouter = require('express').Router();
const logger = require('../utils/logger');;
const jwt = require('jsonwebtoken');
const Blog = require('../models/Blog');
const User = require('../models/User');

const getTokenFrom = request => {
	const authorization = request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7);
	}
	return null;
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const token = request.token;
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}
	const user = await User.findById(decodedToken.id);

  if (!body.likes) {
    body.likes = 0;
  }

  if (!body.title || !body.url){
    return response.status(400).json({
      error: 'title or url missing'
    });
  }

  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
  });

  try {
      const result = await blog.save();
      logger.info(`added ${blog.title} to the blog list`);
      user.blogs = user.blogs.concat(blog._id);
      await user.save();
      logger.info(`blog linked to user ${user.username}`);
      response.status(201).json(result);
  } catch (error) {
      if (error.code === 11000) {
			  return response.status(400).json({ error: error.message });
		} else {
			  next(error);
		}
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
	const body = request.body;

	if (!body.likes) {
		  body.likes = 0;
	}

  const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
  };

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });        
        response.json(updatedBlog.toJSON());
    } catch (error) {
        next(error);
    }	
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
      const token = request.token;
      const decodedToken = jwt.verify(token, process.env.SECRET);
      const user = await User.findById(decodedToken.id);
      const blogToDelete = await Blog.findById(request.params.id);
      if ( blogToDelete.user._id.toString() === user._id.toString() ) {
          await Blog.findByIdAndRemove(request.params.id);
          response.status(204).end();		
      } else {
          return response.status(401).json({ error: 'unauthorized' });
      }
  } catch (error) {
      next(error);
  }
});

module.exports = blogsRouter;