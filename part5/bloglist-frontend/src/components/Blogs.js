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
        .map(({ title, author, id, user, url, likes }) => (
          <Blog
            user={user}
            loggedUsername={loggedUsername}
            id={id}
            key={id}
            title={title}
            author={author}
            likes={likes}
            url={url}
            onLikeClick={onLikeClick}
            onRemoveClick={onRemoveClick}
          />
        ))}
    </>
  );
}
