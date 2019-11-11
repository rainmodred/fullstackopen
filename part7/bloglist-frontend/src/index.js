import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Container } from 'semantic-ui-react';
import blogReducer from './reducers/blogReducer';
import loginReducer from './reducers/loginReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import App from './App';

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  login: loginReducer,
  users: userReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <Container>
      <App />
    </Container>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
