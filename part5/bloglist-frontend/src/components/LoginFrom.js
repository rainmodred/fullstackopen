import React, { useState } from 'react';
import Notification from './Notification';

export default function LoginForm({ handleLogin, notification }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({ username, password });
    setUsername('');
    setPassword('');
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
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            passwrod
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
}
