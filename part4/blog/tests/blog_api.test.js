const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const helper = require('./test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');

describe('HTTP GET request', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
  });
  test('returns the correct amount ', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(helper.initialBlogs.length);
  });
  test('in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('id property ', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
});

describe('HTTP POST request', () => {
  let token;
  beforeAll(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    const newUser = {
      username: 'root',
      name: 'rootname',
      password: 'test',
    };
    await api.post('/api/users').send(newUser);

    const response = await api.post('/api/login').send({
      username: 'root',
      password: 'test',
    });

    token = response.body.token;
  });
  test('creates a new blog post', async () => {
    const newBlog = {
      title: 'POST test',
      author: 'Test',
      url: 'test',
      likes: 1,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(1);

    const contents = blogsAtEnd.map(n => n.title);

    expect(contents).toContain('POST test');
  });
  test('verify likes property', async () => {
    const newBlog = {
      title: 'Likes test',
      author: 'Test',
      url: 'test',
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBeDefined();
    expect(response.body.likes).toBe(0);
  });
  test('verify title and url prop', async () => {
    const newBlog = {
      author: 'Test',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });
});

describe('deletion of a blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
  });
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0].id;

    await api.delete(`/api/blogs/${blogToDelete}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map(blog => blog.title);
    expect(contents).not.toContain(blogToDelete.title);
  });
});

describe('update blog', () => {
  test('succeeds blog update', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 15 })
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd[0];
    expect(updatedBlog.likes).toBe(15);
  });
});

afterAll(() => {
  mongoose.connection.close(true);
});