import React from 'react';

export default function LoginForm({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
}) {
  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
        </div>
        <div>
          <label>
            passwrod
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
}
