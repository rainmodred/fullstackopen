import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ createAnecdote, showNotification }) => {
  const addAnecdote = e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    createAnecdote(content);
    showNotification(`created ${content}`);
    setTimeout(() => {
      showNotification(``);
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

export default connect(
  null,
  { createAnecdote, showNotification },
)(AnecdoteForm);
