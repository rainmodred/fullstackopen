const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');

mongoose
  .connect(config.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connection to MongoDB', error.message));

app.use(cors());
app.use(bodyParse.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
