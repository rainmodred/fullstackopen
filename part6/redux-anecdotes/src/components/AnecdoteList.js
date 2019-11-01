import React from 'react';
import { connect } from 'react-redux';
import { incVote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({ anecdotes, filter, incVote, showNotification }) => {
  const vote = id => {
    incVote(id);

    showNotification(`you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`);
    setTimeout(() => {
      showNotification(``);
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

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
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
