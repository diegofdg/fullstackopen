const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);    
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

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
      likes: body.likes
  });

  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
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
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
  } catch (error) {
      next(error);
  }
});

module.exports = blogsRouter;