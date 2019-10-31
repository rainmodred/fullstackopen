import React from 'react';
import { incVote } from '../reducers/anecdoteReducer';

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState();
  const vote = id => {
    store.dispatch(incVote(id));
  };
  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
