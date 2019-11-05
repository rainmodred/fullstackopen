import React from 'react';
import Notification from './Notification';
import { useField } from '../hooks/index';

export default function LoginForm({ handleLogin, notification }) {
  const username = useField('text');
  const password = useField('password');

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({ username: username.props.value, password: password.props.value });
    username.reset();
    password.reset();
  }
  return (
    <>
      <h2>log in to application</h2>
      {notification !== null && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input {...username.props} />
          </label>
        </div>
        <div>
          <label>
            password
            <input {...password.props} />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
}
