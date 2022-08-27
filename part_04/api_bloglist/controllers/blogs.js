const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);    
});

blogsRouter.post('/', (request, response) => {
  const body = request.body;

  if (!body.likes) {
    body.likes = 0;
  }

  if (!body.title || !body.url){
    return response.status(400).json({
      error: 'content missing'
    });
  }
  
  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
  });

    blog
      .save()
      .then(result => {
        response.status(201).json(result);
      });
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
  } catch (exception) {
      next(exception);
  }
});

module.exports = blogsRouter;