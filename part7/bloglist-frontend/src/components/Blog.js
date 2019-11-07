import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateLikes, deleteBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

function Blog({ blog, creator, updateLikes, deleteBlog, setNotification }) {
  const { title, author, url, likes, user, id } = blog;
  const [toggled, setToggled] = useState(false);

  function handleLikeClick() {
    const updatedBlog = {
      title,
      author,
      url,
      id,
      user: user.id,
      likes: likes + 1,
    };
    updateLikes(updatedBlog);
  }

  function handleRemoveClick() {
    if (window.confirm(`remove blog ${title} by ${author}`)) {
      try {
        deleteBlog(id);
        setNotification({ message: `removed blog ${title} by ${author}`, type: 'log' }, 5);
      } catch (error) {
        const errorMessage = error.response.data.error;
        setNotification({ message: errorMessage, type: 'error' }, 5);
      }
    }
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
        <div>{creator && <button onClick={handleRemoveClick}>remove</button>} </div>
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

const mapDispatchToProps = {
  updateLikes,
  deleteBlog,
  setNotification,
};

export default connect(
  null,
  mapDispatchToProps,
)(Blog);

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    auhtor: PropTypes.string,
    id: PropTypes.string,
    url: PropTypes.string,
    user: PropTypes.object,
    likes: PropTypes.number,
  }),
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};
