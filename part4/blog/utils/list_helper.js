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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
