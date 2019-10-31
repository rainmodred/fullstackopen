import React from 'react';
import { incVote, createAnecdote } from './reducers/anecdoteReducer';

const App = ({ store }) => {
  const anecdotes = store.getState();

  const vote = id => {
    store.dispatch(incVote(id));
  };

  const addAnecdote = e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    store.dispatch(createAnecdote(content));
    e.target.anecdote.value = '';
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
