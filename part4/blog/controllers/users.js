const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body;
    if (!password || password.length < 3) {
      return response.status(400).json({
        error: 'invalid password',
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users.map(u => u.toJSON()));
});

module.exports = usersRouter;
