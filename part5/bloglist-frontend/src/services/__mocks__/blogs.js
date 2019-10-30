const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 17,
    user: {
      username: 'test',
      name: 'test',
      id: '5db34dd93ce9b6130472997b',
    },
    id: '5db34eb1f3e3c42aec3b3108',
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 21,
    user: {
      username: 'test',
      name: 'test',
      id: '5db34dd93ce9b6130472997b',
    },
    id: '5db34f7ff3e3c42aec3b310b',
  },
];

function getAll() {
  return Promise.resolve(initialBlogs);
}

function setToken() {
  return Promise.resolve();
}

export default { getAll, setToken };
