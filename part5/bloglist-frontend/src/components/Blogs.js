import React from 'react';
import Blog from './Blog';

export default function Blogs({ blogs }) {
  return (
    <>
      <h2>blogs</h2>
      {blogs.map(({ title, author, id }) => (
        <Blog key={id} title={title} author={author} />
      ))}
    </>
  );
}
