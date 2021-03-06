import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function App({ anecdotes }) {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  function handleNextClick() {
    setSelected(getRandomInt(anecdotes.length));
  }

  function handleVote() {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  function getMVAnecdote() {
    const mostVotes = Math.max(...votes);
    const mostVotesInd = votes.indexOf(mostVotes);
    return mostVotesInd;
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextClick}>next anecdote</button>
      <h2>Anecdote wtih most votes</h2>
      <p>{anecdotes[getMVAnecdote()]}</p>
      <p>has {votes[getMVAnecdote()]} votes</p>
    </div>
  );
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
