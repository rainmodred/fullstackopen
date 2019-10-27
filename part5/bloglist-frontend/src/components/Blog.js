import React, { useState } from 'react';

function Blog({ loggedUsername, title, author, url, likes, user, id, onLikeClick, onRemoveClick }) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [toggled, setToggled] = useState(false);

  function handleLikeClick() {
    const updatedBlog = {
      title,
      author,
      url,
      user: user.id,
      likes: likes + 1,
    };
    onLikeClick(id, updatedBlog);
  }

  function handleRemoveClick() {
    const blog = {
      title,
      author,
      id,
    };
    onRemoveClick(blog);
  }

  if (toggled)
    return (
      <div style={blogStyle}>
        <div onClick={() => setToggled(!toggled)}>
          {title} {author}
        </div>
        <div>
          <a href={url}> {url}</a>
        </div>
        <div>
          {likes} likes <button onClick={handleLikeClick}>like</button>
        </div>
        <div>added by {user.name}</div>
        <div>
          {loggedUsername === user.username && <button onClick={handleRemoveClick}>remove</button>}{' '}
        </div>
      </div>
    );

  return (
    <div style={blogStyle}>
      <div onClick={() => setToggled(!toggled)}>
        {title} {author}
      </div>
    </div>
  );
}

export default Blog;
