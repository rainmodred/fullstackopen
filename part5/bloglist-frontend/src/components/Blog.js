import React, { useState } from 'react';

function Blog({ title, author, url, likes, user, id, onLikeClick }) {
  const [toggled, setToggled] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

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
