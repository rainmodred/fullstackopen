import React from 'react';
import Blog from './Blog';
import Notification from './Notification';

export default function Blogs({ blogs, notification }) {
  if (blogs.length === 0) return null;
  return (
    <>
      <h2>blogs</h2>
      {notification !== null && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {blogs.map(({ title, author, id }) => (
        <Blog key={id} title={title} author={author} />
      ))}
    </>
  );
}
