import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ store }) => {
  const addAnecdote = e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    store.dispatch(createAnecdote(content));
    store.dispatch(showNotification(`created ${content}`));
    setInterval(() => {
      store.dispatch(showNotification(``));
    }, 5000);
    e.target.anecdote.value = '';
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
