const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const helper = require('./test_helper');
const Blog = require('../models/blog');

describe('Blog api test', () => {
  let token;
  beforeAll(async () => {
    const response = await api.post('/api/login').send({
      username: 'test',
      password: 'test',
    });
    token = response.body.token;

    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
  });

  describe('HTTP GET', () => {
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
  describe('HTTP POST', () => {
    test('creates a new blog post', async () => {
      const newBlog = {
        title: 'POST test',
        author: 'test',
        url: 'http://test.test',
        likes: 1,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

      const contents = blogsAtEnd.map(n => n.title);

      expect(contents).toContain('POST test');
    });
    test('verify likes property', async () => {
      const newBlog = {
        title: 'Likes test',
        author: 'test',
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
  describe('HTTP Delete', () => {
    beforeEach(async () => {
      await Blog.deleteMany({});
      const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
      const promiseArray = blogObjects.map(blog => blog.save());
      await Promise.all(promiseArray);
    });
    test('succeeds if token and id is valid', async () => {
      const blogToDelete = helper.initialBlogs[0];

      await api
        .delete(`/api/blogs/${blogToDelete._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);

      const contents = blogsAtEnd.map(blog => blog.title);
      expect(contents).not.toContain(blogToDelete.title);
    });
    test('fails if id invalid', async () => {
      const blogToDelete = '5db2fbcbbfeed11444276568';

      await api
        .delete(`/api/blogs/${blogToDelete}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
    });
    test('fails if token missing', async () => {
      const blogToDelete = helper.initialBlogs[0];

      await api.delete(`/api/blogs/${blogToDelete._id}`).expect(401);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
    });
    test('user does not have permission', async () => {
      const blogToDelete = helper.initialBlogs[5];

      await api
        .delete(`/api/blogs/${blogToDelete._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(403);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);

      const contents = blogsAtEnd.map(blog => blog.title);
      expect(contents).toContain(blogToDelete.title);
    });
  });
  describe('HTTP PUT', () => {
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
});

afterAll(() => {
  mongoose.connection.close(true);
});
