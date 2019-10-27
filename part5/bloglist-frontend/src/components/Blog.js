import React, { useState } from 'react';

function Blog({ title, author, url, likes, user }) {
  console.log({ title, author, url, likes, user });
  const [toggled, setToggled] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

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
          {likes} likes <button>like</button>
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
