const SET_NOTIFICATION = 'SET_NOTIFICATION';
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

const initialState = {
  message: '',
  type: 'log',
};

export default function reducer(state = initialState, action) {
  const { type, notification } = action;

  switch (type) {
    case SET_NOTIFICATION:
      return { message: notification.message, type: notification.type };
    case CLEAR_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
}

export function setNotification(notification, seconds) {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      });
    }, seconds * 1000);
  };
}

export function clearNotification() {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
}
