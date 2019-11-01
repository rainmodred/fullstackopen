import React from 'react';
import { incVote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({ store }) => {
  const { anecdotes, filter } = store.getState();

  const vote = id => {
    store.dispatch(incVote(id));
    store.dispatch(
      showNotification(`you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`),
    );
    setInterval(() => {
      store.dispatch(showNotification(``));
    }, 5000);
  };

  const anecdotesToShow = () => {
    return anecdotes
      .filter(({ content }) => content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote => {
        return (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        );
      });
  };
  return anecdotesToShow();
};

export default AnecdoteList;
