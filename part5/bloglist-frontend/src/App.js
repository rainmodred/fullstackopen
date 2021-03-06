import React, { useState, useEffect } from 'react';
import LoginFrom from './components/LoginFrom';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogFrom';
import Togglable from './components/Togglable';
import loginService from './services/login';
import blogsService from './services/blogs';

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const blogFormRef = React.createRef();

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
      const errorMessage = error.response.data.error;
      setNotification({ message: errorMessage, type: 'error' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }

  async function handleCreateBlog(newBlog) {
    blogFormRef.current.toggleVisibility();
    const returnedBlog = await blogsService.create(newBlog);
    setBlogs([...blogs, returnedBlog]);
    setNotification({
      message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      type: 'log',
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }

  async function handleLikeClick(id, newBlog) {
    const updatedBlog = await blogsService.update(id, newBlog);
    setBlogs(
      blogs.map(blog => {
        if (blog.id === updatedBlog.id) {
          return {
            ...blog,
            likes: updatedBlog.likes,
          };
        }
        return blog;
      }),
    );
  }

  async function handleDeleteBlog({ title, author, id }) {
    if (window.confirm(`remove blog ${title} by ${author}`)) {
      try {
        await blogsService.deleteBlog(id);
        setBlogs(blogs.filter(blog => blog.id !== id));
        setNotification({ message: `removed blog ${title} by ${author}`, type: 'log' });
      } catch (error) {
        const errorMessage = error.response.data.error;
        setNotification({ message: errorMessage, type: 'error' });
      }
    }

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }

  function handleLogout() {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  }

  function blogForm() {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
    );
  }

  return user === null ? (
    <LoginFrom handleLogin={handleLogin} notification={notification} />
  ) : (
    <div>
      <div>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      {blogForm()}
      <Blogs
        loggedUsername={user.username}
        blogs={blogs}
        notification={notification}
        onLikeClick={handleLikeClick}
        onRemoveClick={handleDeleteBlog}
      />
    </div>
  );
}

export default App;
