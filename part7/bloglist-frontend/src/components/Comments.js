import React from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import { useField } from '../hooks/index';

export default function Comments({ comments, handleAddComment }) {
  const comment = useField('text');

  function addComment(e) {
    e.preventDefault();
    handleAddComment(comment.props.value);
    comment.reset();
  }
  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {comments.map(({ content, id }) => (
        <Comment key={id}>
          <Comment.Text>{content}</Comment.Text>
        </Comment>
      ))}
      <Form reply onSubmit={addComment}>
        <Form.Input {...comment.props} />
        <Button content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    </Comment.Group>
  );
}
