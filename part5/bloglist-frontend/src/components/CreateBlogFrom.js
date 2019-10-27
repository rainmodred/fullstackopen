import React, { useState } from 'react';

export default function CreateBlogForm({ handleCreateBlog }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setTitle('');
    setAuthor('');
    setUrl('');
    handleCreateBlog({ title, author, url });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        <label>
          title
          <input value={title} type="text" onChange={({ target }) => setTitle(target.value)} />
        </label>
      </div>
      <div>
        <label>
          author
          <input value={author} type="text" onChange={({ target }) => setAuthor(target.value)} />
        </label>
      </div>
      <div>
        <label>
          url
          <input value={url} type="text" onChange={({ target }) => setUrl(target.value)} />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  );
}
