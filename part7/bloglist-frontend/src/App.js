import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from './components/Menu';
import LoginFrom from './components/LoginFrom';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Users from './components/Users';
import User from './components/User';
import BlogForm from './components/BlogFrom';
import Togglable from './components/Togglable';
import { initBlogs } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';
import { logout, setUser } from './reducers/loginReducer';
import { initUsers } from './reducers/userReducer';

function App({ user, users, blogs, initBlogs, initUsers, setUser, logout }) {
  const blogFormRef = React.createRef();

  useEffect(() => {
    try {
      initUsers();
      initBlogs();
    } catch (error) {
      console.log(error);
    }
  }, [initBlogs, initUsers]);

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

  const userById = id => users.find(user => user.id === id);
  const blogById = id => blogs.find(blog => blog.id === id);

  return user.token === null ? (
    <LoginFrom />
  ) : (
    <div>
      <div></div>
      <Router>
        <Menu />
        <p>
          {user.token.name} logged in <button onClick={logout}>logout</button>
        </p>

        <Route
          exact
          path="/"
          render={() => {
            return (
              <>
                {blogForm()}
                <Blogs />
              </>
            );
          }}
        />
        <Route exact path="/users" render={() => <Users users={users} />} />
        <Route
          path="/users/:id"
          render={({ match }) => <User user={userById(match.params.id)} />}
        />
        <Route
          path="/blogs/:id"
          render={({ match }) => (
            <Blog blog={blogById(match.params.id)} creator={user.token.username} />
          )}
        />
      </Router>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    blogs: state.blogs,
    user: state.login,
    users: state.users,
  };
}

const mapDispatchToProps = {
  initBlogs,
  initUsers,
  setUser,
  logout,
  setNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
