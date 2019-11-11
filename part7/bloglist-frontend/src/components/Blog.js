import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Item, Button, Icon, Label } from 'semantic-ui-react';
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
        setNotification({ message: `removed blog ${title} by ${author}`, type: 'positive' }, 5);
      } catch (error) {
        const errorMessage = error.response.data.error;
        setNotification({ message: errorMessage, type: 'negative' }, 5);
      }
    }
  }

  function handleAddComment(newComment) {
    addComment(id, newComment);
  }

  return (
    <Item>
      <Item.Header as="h3">{title}</Item.Header>
      <Item.Description>added by {user.username}</Item.Description>
      <Item.Content as="a" href={url}>
        {url}
      </Item.Content>

      <Item.Meta>
        <Button as="div" labelPosition="left">
          <Label as="span" basic pointing="right">
            {likes}
          </Label>
          <Button icon onClick={handleLikeClick}>
            <Icon name="heart" />
            Like
          </Button>
        </Button>
      </Item.Meta>
      <Item.Description style={{ marginTop: '10px' }}>
        {creator === user.username && (
          <Button color="red" onClick={handleRemoveClick}>
            remove
          </Button>
        )}
      </Item.Description>
      <Comments comments={blog.comments} handleAddComment={handleAddComment} />
    </Item>
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
