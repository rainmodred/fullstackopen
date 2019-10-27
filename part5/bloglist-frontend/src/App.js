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

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      console.log(user);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
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
      <p>{user.name} logged in</p> <Blogs blogs={blogs} />
    </div>
  );
}

export default App;
