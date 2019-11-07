import loginService from '../services/login';
import blogService from '../services/blogs';

const initialState = {
  token: null,
  error: null,
};

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
const LOGIN_ERROR = 'LOGIN_ERROR ';
const SET_USER = 'SET_USER';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, token: action.user, error: null };
    case LOGOUT:
      return initialState;
    case SET_USER:
      return { ...state, token: action.user, error: null };
    case LOGIN_ERROR:
      return { ...state, token: null, error: action.error };
    default:
      return state;
  }
}

export function login(credentials) {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({
        type: LOGIN_SUCCESS,
        user,
      });
    } catch (error) {
      dispatch({ type: LOGIN_ERROR, error: error.response.data.error });
    }
  };
}

export function setUser() {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch({
        type: SET_USER,
        user,
      });
    }
  };
}

export function logout() {
  return dispatch => {
    window.localStorage.removeItem('loggedUser');
    dispatch({
      type: LOGOUT,
    });
  };
}
