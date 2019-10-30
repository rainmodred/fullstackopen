import React from 'react';
import { useField } from '../hooks/index';

export default function BlogForm({ handleCreateBlog }) {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  function handleSubmit(e) {
    e.preventDefault();
    handleCreateBlog({
      title: title.props.value,
      author: author.props.value,
      url: url.props.value,
    });
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
