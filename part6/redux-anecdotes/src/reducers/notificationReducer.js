const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.message;
    default:
      return state;
  }
};

export default reducer;

export const showNotification = message => {
  return {
    type: 'SHOW_NOTIFICATION',
    message,
  };
};
