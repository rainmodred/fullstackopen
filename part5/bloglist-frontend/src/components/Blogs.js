import React from 'react';
import Blog from './Blog';
import Notification from './Notification';

export default function Blogs({ blogs, notification, onLikeClick }) {
  if (blogs.length === 0) return null;

  return (
    <>
      <h2>blogs</h2>
      {notification !== null && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {blogs.map(({ title, author, id, user, url, likes }) => (
        <Blog
          id={id}
          key={id}
          title={title}
          author={author}
          likes={likes}
          url={url}
          user={user}
          onLikeClick={onLikeClick}
        />
      ))}
    </>
  );
}
