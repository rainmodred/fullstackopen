import React, { useState, useEffect } from 'react';
import LoginFrom from './components/LoginFrom';
import Blogs from './components/Blogs';
import CreateBlogForm from './components/CreateBlogFrom';
import loginService from './services/login';
import blogsService from './services/blogs';

function App() {
  const [user, setUser] = useState(null);
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
      blogsService.setToken(user.token);
    }
  }, []);

  async function handleLogin(newUser) {
    try {
      const user = await loginService.login(newUser);

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogsService.setToken(user.token);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreateBlog(newBlog) {
    const returnedBlog = await blogsService.create(newBlog);
    setBlogs([...blogs, returnedBlog]);
  }

  function handleLogout() {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  }

  return user === null ? (
    <LoginFrom handleLogin={handleLogin} />
  ) : (
    <div>
      <div>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      <CreateBlogForm handleCreateBlog={handleCreateBlog} />
      <Blogs blogs={blogs} />
    </div>
  );
}

export default App;
