import React, { useState, useEffect } from 'react';
import LoginFrom from './components/LoginFrom';
import Blogs from './components/Blogs';
import loginService from './services/login';
import blogsService from './services/blogs';

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [blogs, setBlogs] = useState('');

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogsService.getAll();
      setBlogs(blogs);
    }

    getBlogs();
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  }
  return user === null ? (
    <LoginFrom
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  ) : (
    <div>
      <div>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
      </div>{' '}
      <Blogs blogs={blogs} />
    </div>
  );
}

export default App;
