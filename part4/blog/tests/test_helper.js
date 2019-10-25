const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
    user: '5db2ecddc82afd24ac38e8e2',
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
    user: '5db2ecddc82afd24ac38e8e2',
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
    user: '5db2ecddc82afd24ac38e8e2',
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
    user: '5db2ecddc82afd24ac38e8e2',
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
    user: '5db31bc47f94501790950f92',
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
    user: '5db31bc47f94501790950f92',
  },
];

const initialUsers = [
  {
    _id: '5db2ecddc82afd24ac38e8e2',
    blogs: [
      '5a422a851b54a676234d17f7',
      '5a422aa71b54a676234d17f8',
      '5a422b3a1b54a676234d17f9',
      '5a422b3a1b54a676234d17fa',
    ],
    username: 'test',
    name: 'test',
    passwordHash:
      '$2b$10$4RIW1ydn6mH5b/o22M26VOz0s6qze09FMPG6Sxh7uRVY89qcT1A7W',
    __v: 0,
  },
  {
    _id: '5db31bc47f94501790950f92',
    blogs: ['5a422a851b54a676234d17fb', '5a422aa71b54a676234d17fc'],
    username: 'test1',
    name: 'test1',
    passwordHash:
      '$2b$10$KSe5SjmxeGv5bAwh/UAp7etrSUI4OZozAs4NjDxI1pZ7n6jYzSZ2e',
    __v: 0,
  },
];

async function blogsInDb() {
  const blogs = await Blog.find({});

  return blogs.map(blog => blog.toJSON());
}

async function usersInDb() {
  const users = await User.find({});
  return users.map(user => user.toJSON());
}

module.exports = {
  initialUsers,
  initialBlogs,
  blogsInDb,
  usersInDb,
};
