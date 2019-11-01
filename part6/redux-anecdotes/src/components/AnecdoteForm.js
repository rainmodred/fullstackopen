import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';
import anecdotesService from '../services/anecdotes';

const AnecdoteForm = ({ createAnecdote, showNotification }) => {
  const addAnecdote = async e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    const newNote = await anecdotesService.create(content);
    createAnecdote(newNote);
    showNotification(`created ${newNote.content}`);
    setTimeout(() => {
      showNotification(``);
    }, 5000);
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
