import userService from '../services/users';

const INIT_USERS = 'INIT_USERS';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case INIT_USERS:
      return action.data;
    default:
      return state;
  }
}

export function initUsers() {
  return async dispatch => {
    const data = await userService.getAll();
    dispatch({ type: INIT_USERS, data });
  };
}
