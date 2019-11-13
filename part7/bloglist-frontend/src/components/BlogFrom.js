import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Header } from 'semantic-ui-react';
import { useField } from '../hooks/index';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

function BlogForm({ user, createBlog, setNotification, toggleVisibility }) {
  const title = useField('text', 'title');
  const author = useField('text', 'author');
  const url = useField('text', 'url');

  let isDisabled = !user.token && true;
  if (title.props.value === '' || author.props.value === '' || url.props.value === '')
    isDisabled = true;

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
          type: 'positive',
        },
        5,
      );
    } catch (error) {
      const errorMessage = error.response.data.error;
      setNotification(
        {
          message: errorMessage,
          type: 'negative',
        },
        5,
      );
    }

    title.reset();
    author.reset();
    url.reset();
  }

  return (
    <Form style={{ marginBottom: '10px' }} onSubmit={handleSubmit}>
      <Header as="h2">Create new blog</Header>
      <Form.Field>
        <label>
          title
          <input {...title.props} />
        </label>
      </Form.Field>
      <Form.Field>
        <label>
          author
          <input {...author.props} />
        </label>
      </Form.Field>
      <Form.Field>
        <label>
          url
          <input {...url.props} />
        </label>
      </Form.Field>
      <Button disabled={isDisabled} color="green" type="submit">
        create
      </Button>
    </Form>
  );
}

function mapStateToProps(state) {
  return {
    blogs: state.blogs,
    user: state.login,
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
