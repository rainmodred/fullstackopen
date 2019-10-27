const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response, next) => {
  const { title, url, author, likes } = request.body;

  if (!title || !url) {
    return response.status(400).send({ error: 'missing title or url' });
  }
  const { token } = request;

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user
    });

    const savedBlog = await blog.save();
    user.blogs = [...user.blogs, savedBlog._id];
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params;
  const { token } = request;

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(404).send({ error: 'blog not found' });
    }
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(404).send({ error: 'user not found' });
    }

    if (user._id.toString() === blog.user.toString()) {
      await Blog.findByIdAndDelete(id);
      response.status(204).end();
    } else {
      response.status(403).send({ error: 'user does not have permission' });
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, url, author, likes } = request.body;

  const { id } = request.params;

  const blog = {
    title,
    author,
    url,
    likes: likes || 0,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    if (!updatedBlog) response.status(404).end();
    response.status(200).json(updatedBlog.toJSON());
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
