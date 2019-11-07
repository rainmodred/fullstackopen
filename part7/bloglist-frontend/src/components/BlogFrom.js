import React from 'react';
import { connect } from 'react-redux';
import { useField } from '../hooks/index';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

function BlogForm({ createBlog, setNotification, toggleVisibility }) {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  async function handleSubmit(e) {
    e.preventDefault();
    toggleVisibility();
    try {
      createBlog({
        title: title.props.value,
        author: author.props.value,
        url: url.props.value,
      });
      setNotification(
        {
          message: `a new blog ${title.props.value} by ${author.props.value} added`,
          type: 'log',
        },
        5,
      );
    } catch (error) {
      const errorMessage = error.response.data.error;
      setNotification(
        {
          message: errorMessage,
          type: 'error',
        },
        5,
      );
    }

    title.reset();
    author.reset();
    url.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        <label>
          title
          <input {...title.props} />
        </label>
      </div>
      <div>
        <label>
          author
          <input {...author.props} />
        </label>
      </div>
      <div>
        <label>
          url
          <input {...url.props} />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  );
}

function mapStateToProps(state) {
  return {
    blogs: state.blogs,
  };
}

const mapDispatchToProps = {
  createBlog,
  setNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogForm);
