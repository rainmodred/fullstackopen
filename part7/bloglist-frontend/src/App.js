import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LoginFrom from './components/LoginFrom';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogFrom';
import Togglable from './components/Togglable';
import { initBlogs } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';
import { logout, setUser } from './reducers/loginReducer';

function App({ user, initBlogs, setUser, logout }) {
  const blogFormRef = React.createRef();

  useEffect(() => {
    try {
      initBlogs();
    } catch (error) {
      console.log(error);
    }
  }, [initBlogs]);

  useEffect(() => {
    setUser();
  }, [setUser]);

  function toggleVisibility() {
    blogFormRef.current.toggleVisibility();
  }

  function blogForm() {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm toggleVisibility={toggleVisibility} />
      </Togglable>
    );
  }

  return user.token === null ? (
    <LoginFrom />
  ) : (
    <div>
      <div>
        <p>
          {user.token.name} logged in <button onClick={logout}>logout</button>
        </p>
      </div>
      {blogForm()}
      <Blogs />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    blogs: state.blogs,
    user: state.login,
  };
}

const mapDispatchToProps = {
  initBlogs,
  setUser,
  logout,
  setNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
