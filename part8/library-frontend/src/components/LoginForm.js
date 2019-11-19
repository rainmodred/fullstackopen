import React, { useState } from 'react';

export default function LoginForm({ show, login, setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!show) {
    return null;
  }

  async function submit(e) {
    e.preventDefault();
    const res = await login({
      variables: { username, password },
    });
    if (res) {
      const token = res.data.login.value;
      setToken(token);
      localStorage.setItem('user', token);
    }
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}
