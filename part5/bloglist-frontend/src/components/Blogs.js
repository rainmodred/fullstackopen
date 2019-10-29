import React from 'react';
import Blog from './Blog';
import Notification from './Notification';

export default function Blogs({ blogs, loggedUsername, notification, onLikeClick, onRemoveClick }) {
  if (blogs.length === 0) return null;

  return (
    <>
      <h2>blogs</h2>
      {notification !== null && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            blog={blog}
            loggedUsername={loggedUsername}
            key={blog.id}
            onLikeClick={onLikeClick}
            onRemoveClick={onRemoveClick}
          />
        ))}
    </>
  );
}
