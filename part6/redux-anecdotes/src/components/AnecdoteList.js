import React from 'react';
import { connect } from 'react-redux';
import { incVote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({ visibleAnecdotes, incVote, showNotification }) => {
  const vote = id => {
    const anecdote = visibleAnecdotes.find(anecdote => anecdote.id === id);
    incVote(id, anecdote);
    showNotification(
      `you voted '${visibleAnecdotes.find(anecdote => anecdote.id === id).content}'`,
    );
    setTimeout(() => {
      showNotification(``);
    }, 5000);
  };

  return visibleAnecdotes
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

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes.filter(({ content }) => content.toLowerCase().includes(filter.toLowerCase()));
};

const mapStateToProps = state => {
  return {
    visibleAnecdotes: anecdotesToShow(state),
  };
};

const mapDispatchToProps = {
  incVote,
  showNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList);
