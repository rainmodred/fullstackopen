// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = anecdote => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

import anecdotesService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(anecdoteObj =>
        anecdoteObj.id === action.id
          ? { ...anecdoteObj, votes: anecdoteObj.votes + 1 }
          : anecdoteObj,
      );
    case 'CREATE_ANECDOTE':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export default reducer;

export const incVote = (id, newAnecdote) => {
  return async dispatch => {
    const data = await anecdotesService.update(id, {
      ...newAnecdote,
      votes: newAnecdote.votes + 1,
    });
    dispatch({
      type: 'VOTE',
      id: data.id,
    });
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const data = await anecdotesService.create(content);
    dispatch({
      type: 'CREATE_ANECDOTE',
      data,
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await anecdotesService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data,
    });
  };
};
