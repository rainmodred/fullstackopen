function dummy(blogs) {
  return 1;
}

function totalLikes(blogs) {
  return blogs.reduce((prev, curr) => prev + curr.likes, 0);
}

function favoriteBlog(blogs) {
  const maxLikes = Math.max(...blogs.map(({ likes }) => likes));

  return blogs.find(({ likes }) => likes === maxLikes);
}

function _getAuthorByPropery(arr, prop) {
  if (arr.length === 0) return {};
  const counts = arr.reduce((accum, current) => {
    accum[current.author] = (accum[current.author] || 0) + (current[prop] || 1);
    return accum;
  }, {});

  return Object.keys(counts)
    .map(key => ({ author: key, [prop]: counts[key] }))
    .sort((a, b) => b[prop] - a[prop])[0];
}

function mostBlogs(blogs) {
  return _getAuthorByPropery(blogs, 'blogs');
}

function mostLikes(blogs) {
  return _getAuthorByPropery(blogs, 'likes');
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
