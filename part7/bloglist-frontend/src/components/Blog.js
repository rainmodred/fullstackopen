import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateLikes, deleteBlog, addComment } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import Comments from './Comments';

function Blog({ blog, creator, updateLikes, deleteBlog, setNotification, addComment, history }) {
  if (!blog) return null;
  const { title, author, url, likes, user, id } = blog;

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
      history.push('/');
      try {
        deleteBlog(id);
        setNotification({ message: `removed blog ${title} by ${author}`, type: 'log' }, 5);
      } catch (error) {
        const errorMessage = error.response.data.error;
        setNotification({ message: errorMessage, type: 'error' }, 5);
      }
    }
  }

  function handleAddComment(newComment) {
    addComment(id, newComment);
  }

  return (
    <div>
      <h2>{title}</h2>
      <div>
        <a href={url}> {url}</a>
      </div>
      <div>
        {likes} likes <button onClick={handleLikeClick}>like</button>
      </div>
      <div>added by {user.username}</div>
      <div>{creator === user.username && <button onClick={handleRemoveClick}>remove</button>} </div>
      <Comments comments={blog.comments} handleAddComment={handleAddComment} />
    </div>
  );
}

const mapDispatchToProps = {
  updateLikes,
  deleteBlog,
  setNotification,
  addComment,
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(Blog),
);

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
