import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import blogReducer from './reducers/blogReducer';
import loginReducer from './reducers/loginReducer';
import notificationReducer from './reducers/notificationReducer';
import App from './App';
import './index.css';

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  login: loginReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
