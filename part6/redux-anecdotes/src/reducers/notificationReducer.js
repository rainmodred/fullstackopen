const initialState = {
  message: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { message: action.message };
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
