import React from 'react';
import { useField } from '../hooks/index';

export default function Comments({ comments, handleAddComment }) {
  const comment = useField('text');

  function addComment(e) {
    e.preventDefault();
    handleAddComment(comment.props.value);
    comment.reset();
  }
  return (
    <>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input {...comment.props} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map(({ content, id }) => (
          <li key={id}>{content}</li>
        ))}
      </ul>
    </>
  );
}
