import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Blog({ blog, loggedUsername, onLikeClick, onRemoveClick }) {
  const { title, author, url, likes, user, id } = blog;
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
      <div className="blog">
        <div className="blog-title" onClick={() => setToggled(!toggled)}>
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
    <div className="blog">
      <div className="blog-title" onClick={() => setToggled(!toggled)}>
        {title} {author}
      </div>
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    auhtor: PropTypes.string,
    id: PropTypes.string,
    url: PropTypes.string,
    user: PropTypes.object,
    likes: PropTypes.number,
  }),
  loggedUsername: PropTypes.string.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
};

export default Blog;
