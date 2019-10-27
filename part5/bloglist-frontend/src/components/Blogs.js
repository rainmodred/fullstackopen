import React from 'react';
import Blog from './Blog';

export default function Blogs({ blogs }) {
  if (blogs.length === 0) return null;
  return (
    <>
      <h2>blogs</h2>
      {blogs.map(({ title, author, id }) => (
        <Blog key={id} title={title} author={author} />
      ))}
    </>
  );
}
