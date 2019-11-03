const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message;
    case 'RESET_NOTIFICATION':
      return action.message;
    default:
      return state;
  }
};

export default reducer;

export const showNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
    });
    setTimeout(() => dispatch({ type: 'RESET_NOTIFICATION', message: '' }), time * 1000);
  };
};
