const supertest = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

describe('user api test', () => {
  beforeAll(async () => {
    await User.deleteMany({});
    const users = helper.initialUsers.map(user => new User(user));
    const promiseArray = users.map(user => user.save());
    await Promise.all(promiseArray);
  });

  describe('new user creation', () => {
    test('fails with missing username', async () => {
      const newUser = {
        name: 'Matti Luukkainen',
        password: 'salainen',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400);
      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd.length).toBe(helper.initialUsers.length);
    });
    test('fails with missing password', async () => {
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400);
      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd.length).toBe(helper.initialUsers.length);
    });
    test('fails with username length less than 3', async () => {
      const newUser = {
        username: 'ml',
        name: 'Matti Luukkainen',
        password: 'salainen',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400);
      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd.length).toBe(helper.initialUsers.length);
    });
    test('fails with password length less than 3', async () => {
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'sa',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400);
      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd.length).toBe(helper.initialUsers.length);
    });
    test('fails if user already exist', async () => {
      const newUser = {
        username: 'test',
        name: 'test',
        password: 'test',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd.length).toBe(helper.initialUsers.length);
    });
    test('succeeds with a fresh username', async () => {
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();

      expect(usersAtEnd.length).toBe(helper.initialUsers.length + 1);

      const usernames = usersAtEnd.map(u => u.username);
      expect(usernames).toContain(newUser.username);
    });
  });

  describe('login', () => {
    test('fails with invalid credentials', async () => {
      const user = {
        username: 'test',
        password: 'wrongpassword',
      };
      await api
        .post('/api/login')
        .send(user)
        .expect(401);
    });
    test('fails with missing credentials', async () => {
      const user = {};
      await api
        .post('/api/login')
        .send(user)
        .expect(401);
    });
    test('succeeds with correct credentials', async () => {
      const user = {
        username: 'test',
        password: 'test',
      };
      const resp = await api
        .post('/api/login')
        .send(user)
        .expect(200);
      expect(resp.body.name).toBe(helper.initialUsers[0].name);
    });
  });
});

afterAll(() => {
  mongoose.connection.close(true);
});
